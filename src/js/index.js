import {Namespace, QName, XML, XMLList} from './jsxml.js';
import {saveAs} from 'filesaver.js';
import {distinctPush, objectLength, rectanglesIntersect} from './utils.js';
import * as dagreD3 from 'dagre-d3';
const $ = require('jquery');
const vex = require('./../../node_modules/vex-js/js/vex.combined.min.js');
const jsPlumb = require('jsplumb');
const jsZIP = require('jszip');
const getJSON = require('load-json-xhr');
vex.defaultOptions.className = 'vex-theme-plain';
var blockIcons;
getJSON('blocks.json', function(err, json) {
  if (err) {
    console.error(err);
    return;
  }
  blockIcons = json;
});
var parameterIcons;
getJSON('parameters.json', function(err, json) {
  if (err) {
    console.error(err);
    return;
  }
  parameterIcons = json;
});
var projects = [];
var currentProjectIndex = -1;

// CONTROLS //

var drag = null;
var panning = {};
var isPanning = false;
var selection = {blocks:[]};
var isSelecting = false;
var timeContextMenu = null;

$(document.body).on("dragover", function(event) {
  event.preventDefault();
});

$(document.body).on("drop", function(event) {
  event.preventDefault();
  var file = event.originalEvent.dataTransfer.files[0];
  handleFile(file);
});

$('#fileUploadClose').click(function(event) {
  $('.file-upload').css('display', 'none');
  $('#fileUploadClose').css('display', 'none');
  $('#fileUploadErrors').html('');
});

$('.project').on('mousedown', function(event) {
  switch (event.which) {
    case 1:
      if (!drag) {
        deselectBlocks();
        isSelecting = true;
        selection = {
          blocks: [],
          x: event.pageX,
          y: event.pageY
        };
        $('.selection').css('display', 'block');
        $('.selection').css('top', selection.y);
        $('.selection').css('right', window.innerWidth - selection.x);
        $('.selection').css('bottom', window.innerHeight - selection.y);
        $('.selection').css('left', selection.x);
      }
      break;
    case 2:
      isPanning = true;
      panning = {
        x: event.pageX,
        y: event.pageY
      };
      $('#data-wires').css('display', 'none');
      break;
  }
});

$('.project').on('mousemove', function(event) {
  switch (event.which) {
    case 1:
      if (drag) {
        drag.dx = event.pageX - drag.prevX;
        drag.dy = event.pageY - drag.prevY;
        drag.prevX = event.pageX;
        drag.prevY = event.pageY;
        selection.blocks.forEach(block => {
          var left = parseInt($(block).css('left'))
          var top = parseInt($(block).css('top'))
          $(block).css('left', left + drag.dx)
          $(block).css('top', top + drag.dy)
        });
      } else {
        $('.selection').css('top', Math.min(selection.y, event.pageY));
        $('.selection').css('right', window.innerWidth - (Math.max(
          selection.x, event.pageX)));
        $('.selection').css('bottom', window.innerHeight - (Math.max(
          selection.y, event.pageY)));
        $('.selection').css('left', Math.min(selection.x, event.pageX));
      }
      break;
    case 2:
      if (isPanning) {
        var dx = (event.pageX - panning.x);
        var dy = (event.pageY - panning.y);
        panning = {
          x: event.pageX,
          y: event.pageY
        };
        pan(dx, dy);
      }
      break;
  }
});

$('.project').on('mouseup', function(event) {
  if (timeContextMenu + 300 <= Date.now()) {
    $('.contextmenu').blur();
    timeContextMenu = null;
  }
  switch (event.which) {
    case 1:
      if (selection && currentProjectIndex >= 0) {
        selection.width = parseInt($('.selection').css('width'));
        selection.height = parseInt($('.selection').css('height'));
        for (var i = 0; i < projects[currentProjectIndex].blocks.length; i++) {
          var block = projects[currentProjectIndex].blocks[i].dom;
          var x = parseInt(block.css('left'));
          var y = parseInt(block.css('top'));
          var width = parseInt(block.css('width'));
          var height = parseInt(block.css('height'));
          if (rectanglesIntersect({x,y,width,height}, selection)) {
            selection.blocks.push(block);
            block.addClass("selected");
          }
        }
      }
      if (drag) {
        drag = null;
      }
      if (isSelecting) {
        $('.selection').css('display', 'none');
        $('.selection').css('top', '');
        $('.selection').css('right', '');
        $('.selection').css('bottom', '');
        $('.selection').css('left', '');
        isSelecting = false;
      }
      break;
    case 2:
      isPanning = false;
      panning = {};
      $('#data-wires').css('display', 'block');
      jsPlumb.repaintEverything();
      break;
  }
});

$('.project').on('mouseleave', function(event) {
  switch (event.which) {
    case 1:
      $('.project').trigger('mouseup');
      break;
  }
});

$('.project').on('mousewheel', function(event) {
  var dx = -event.originalEvent.deltaX;
  var dy = event.originalEvent.deltaY;
  pan(dx, dy);
});

$(document.body).on('keydown', function(event) {
  switch(event.which) {
    // top
    case 38:
      pan(0, 15);
      break;
    // right
    case 39:
      pan(-15, 0);
      break;
    // down
    case 40:
      pan(0, -15);
      break;
    // left
    case 37:
      pan(15, 0);
      break;

  }
})

// HEADER MENU //

$('#open').click(function() {
  $('#open-hidden').trigger('click');
});

$('#open-hidden').change(function(e) {
  if (!$(this).val()) {
    return;
  }
  var file = e.target.files[0];
  handleFile(file);
  $(this).val('');
})

$('#save').click(function() {
  var changes = [];
  for (var i = 0; i < projects[currentProjectIndex].undo.length; i++) {
    var blockIndex = projects[currentProjectIndex].undo[i].blockIndex +
      "";
    var originalName = projects[currentProjectIndex].blocks[
      blockIndex].originalName + ".ev3p.mbxml";
    var parameterIndex = projects[currentProjectIndex].undo[i].parameterIndex +
      "";
    var action = projects[currentProjectIndex].undo[i].fn + "";
    var value = projects[currentProjectIndex].undo[i].to + "";
    if (!changes[blockIndex]) {
      changes[blockIndex] = {};
    }
    changes[blockIndex].originalName = originalName;
    changes[blockIndex].blockIndex = blockIndex;
    if (parameterIndex !== "undefined") {
      if (!changes[blockIndex].parameters) {
        changes[blockIndex].parameters = {};
      }
      if (!changes[blockIndex].parameters[parameterIndex]) {
        changes[blockIndex].parameters[parameterIndex] = {};
      }
      if (!changes[blockIndex].parameters[parameterIndex].fn) {
        changes[blockIndex].parameters[parameterIndex].fn = {};
      }
      changes[blockIndex].parameters[parameterIndex].fn[action] =
        value;
    } else {
      if (!changes[blockIndex].fn) {
        changes[blockIndex].fn = {};
      }
      changes[blockIndex].fn[action] = value;
    }
  }

  function getChange(name) {
    var _change = null;
    changes.some(function(item) {
      if (name !== item.originalName) {
        return false;
      }
      _change = item;
      return true;
    });
    return _change;
  }

  function computeName(blockIndex, parameterIndex, direction,
    dataType) {
    var name = direction + " " + computeAestheticDataType(
      dataType);
    var count = 0;
    var taken;
    do {
      taken = false;
      var currentName = name + ((count) ? count : "");
      for (var n = 0; n < projects[currentProjectIndex].blocks[
          blockIndex].params.length; n++) {
        if (parameterIndex === n) {
          continue;
        }
        if (projects[currentProjectIndex].blocks[blockIndex].params[
            n].name === currentName) {
          taken = true;
          break;
        }
      }
      if (taken) {
        count++;
      }
    } while (taken);
    name = name + ((count) ? count : "");
    projects[currentProjectIndex].blocks[blockIndex].params[
      parameterIndex].name = name;
    return name;
  }

  function computeAestheticDataType(dataType) {
    switch (dataType) {
      case "Single":
        return "Number";
      case "Boolean":
        return "Logic";
      case "String":
        return "Text";
      case "Single[]":
        return "Numeric Array";
      case "Boolean[]":
        return "Logic Array";
    }
    return null;
  }

  function getDirectionOpposite(direction) {
    switch (direction) {
      case "Input":
        return "Output";
      case "Output":
        return "Input";
    }
    return null;
  }

  var zip = projects[currentProjectIndex].zip;
  var refactored = [];
  var numberOfFiles = objectLength(zip.files);
  var currentFile = 0;
  zip.forEach(function(relativePath, zipEntry) {
    zip.file(zipEntry.name).async("string").then(function(
      result) {
      var fileName = zipEntry.name;
      console.log(fileName + ":");
      if (zipEntry.name.endsWith("ev3p") || zipEntry.name
        .endsWith("mbxml") || zipEntry.name.endsWith(
          "lvprojx")) {
        var xml = new XML(result);
        var extension = zipEntry.name.substring(zipEntry.name
          .lastIndexOf(".") + 1);
        switch (extension) {
          // LVPROJX //
          case "lvprojx":
            xml.children().each(function(item, index) {
              if (item.attribute('Name').toString() ===
                "Default") {
                var target = item.child("Project").child(
                  "Target");
                target.children().each(function(block,
                  index) {
                  if (block.localName() ===
                    "ProjectReference") {
                    return;
                  }
                  var change = getChange(block.attribute(
                    "Name").toString().replace(
                    /\\/g, "").replace(
                    /(\.ev3p$)/g,
                    ".ev3p.mbxml"));
                  if (change && change.fn &&
                    change.fn.setName) {
                    switch (block.localName()) {
                      case "SourceFileReference":
                        if (change.originalName ===
                          block.attribute("Name")
                          .toString().replace(
                            /\\/g, "") + ".mbxml"
                        ) {
                          // attr Name "{block}\.ev3p"
                          block.attribute("Name")
                            .setValue(change.fn.setName +
                              "\\.ev3p");
                          // attr StoragePath = // "{block}.ev3p"
                          block.attribute(
                            "StoragePath").setValue(
                            change.fn.setName +
                            ".ev3p");
                          // attr RelativeStoragePath = // "{block}.ev3p"
                          block.attribute(
                            "RelativeStoragePath"
                          ).setValue(change.fn.setName +
                            ".ev3p");
                        }
                        break;
                      case "DefinitionReference":
                        // attr Name "{block}\.ev3p\.mbxml"
                        block.attribute("Name").setValue(
                          change.fn.setName +
                          "\\.ev3p\\.mbxml");
                        break;
                    }
                  }
                });
              } else {
                var change = getChange(item.attribute(
                  'Name').toString().replace(
                  /\\/g, ""));
                if (change && change.fn && change.fn.setName &&
                  change.originalName === item.attribute(
                    'Name').toString().replace(/\\/g,
                    '')) {
                  // attr Name "{block}\.ev3p\.mbxml"
                  item.attribute('Name').setValue(
                    change.fn.setName +
                    "\\.ev3p\\.mbxml");
                  // child ExternalFile child RelativeStoragePath text "{block}.ev3p.mbxml"
                  item.child('ExternalFile').child(
                      'RelativeStoragePath')._children[
                      0]._text = change.fn.setName +
                    ".ev3p.mbxml";
                }
              }
            });
            break;
            // EV3P //
          case "ev3p":
            var change = getChange(zipEntry.name +
              ".mbxml");
            var virtualInstrument = xml.child("Namespace")
              .child("VirtualInstrument");
            if (change) {
              if (change.fn && change.fn.setName) {
                // fileName {block}.ev3p
                fileName = change.fn.setName + ".ev3p";
              }
              if (change.parameters) {
                virtualInstrument.children().each(

                  function(item, i) {
                    if (item.localName() === "DataItem" &&
                      !item.attribute("Name").toString()
                      .match(
                        /(SequenceIn)|(SequenceOut)/g)) {
                      if (change.parameters[i] &&
                        change.parameters[i].fn) {
                        // attr Id {parameter-directionon}\ Number|Logic|Text|Numeric\ Array|Logic\Array
                        if (change.parameters[i].fn.setParameterDirection ||
                          change.parameters[i].fn.setParameterDataType
                        ) {
                          var blockIndex = change.blockIndex;
                          var direction = change.parameters[
                              i].fn.setParameterDirection ||
                            item.attribute(
                              "CallDirection").toString();
                          var dataType = change.parameters[
                              i].fn.setParameterDataType ||
                            item.attribute("DataType").toString();
                          var name = computeName(
                            blockIndex, i, direction,
                            dataType);
                          item.attribute("Name").setValue(
                            name.replace(/ /g, "\\ ")
                          );
                          // attr DataType {dataType}
                          if (change.parameters[i].fn.setParameterDataType) {
                            item.attribute("DataType").setValue(
                              change.parameters[i].fn
                              .setParameterDataType);
                          }
                          if (change.parameters[i].fn.setParameterDefaultValue) {
                            item.attribute(
                              "DefaultValue").setValue(
                              change.parameters[i].fn
                              .setParameterDefaultValue
                            );
                          }
                          // attr Direction {direction}
                          // if (change.parameters[i].fn.setParameterDirection) {
                          // 	console.log(change.parameters[i].fn.setParameterDirection);
                          // 	item.attribute("CallDirection").setValue(change.parameters[i].fn.setParameterDirection);
                          // 	var opposite = getDirectionOpposite(change.parameters[i].fn.setParameterDirection);
                          // 	console.log(opposite);
                          // 	item.attribute("DefaultTerminalDirection").setValue(opposite);
                          // }
                        }
                      }
                    }
                  });
              }
              var blockDiagram = virtualInstrument.child(
                "BlockDiagram");
              var parameterIndex = -1;
              blockDiagram.children().each(function(block) {
                switch (block.localName()) {

                  case "ConfigurableMegaAccessor":
                    if (change.parameters) {
                      var type = block.attribute(
                        "AccessorType").toString();
                      block.children().each(function(
                        parameter) {
                        parameterIndex++;
                        if (change.parameters[
                            parameterIndex] &&
                          change.parameters[
                            parameterIndex].fn) {
                          if (type === "Output") {
                            if (change.parameters[
                                parameterIndex].fn
                              .setParameterDefaultValue
                            ) {
                              parameter.attribute(
                                "ConfiguredValue"
                              ).setValue(change
                                .parameters[
                                  parameterIndex
                                ].fn.setParameterDefaultValue
                              );
                            }
                          }
                          var terminal =
                            parameter.child(
                              "Terminal");
                          if (change.parameters[
                              parameterIndex].fn.setParameterDirection ||
                            change.parameters[
                              parameterIndex].fn.setParameterDataType
                          ) {
                            var blockIndex =
                              change.blockIndex;
                            var direction =
                              change.parameters[
                                parameterIndex].fn
                              .setParameterDirection ||
                              type;
                            var dataType = change
                              .parameters[
                                parameterIndex].fn
                              .setParameterDataType ||
                              terminal.attribute(
                                "DataType").toString();
                            var name =
                              computeName(
                                blockIndex,
                                parameterIndex,
                                direction,
                                dataType);

                            terminal.attribute(
                              "Id").setValue(
                              name.replace(/ /g,
                                "\\ "));
                          }
                          // terminal.attribute("Direction").setValue();
                          if (change.parameters[
                              parameterIndex].fn.setParameterDataType) {
                            terminal.attribute(
                              "DataType").setValue(
                              change.parameters[
                                parameterIndex]
                              .fn.setParameterDataType
                            );
                          }
                          // terminal.attribute("Bounds").setValue();
                        }
                      });
                    }
                    break;
                }
              });
            } else {

              var blockDiagram = virtualInstrument.child(
                "BlockDiagram");
              var parameterIndex = -1;
              blockDiagram.children().each(function(block) {
                switch (block.localName()) {

                  case "ConfigurableMethodCall":
                    var target = getChange(block.attribute(
                      "Target").toString().replace(
                      /\\/g, "") + ".mbxml");
                    if (target) {
                      if (target.fn && target.fn.setName) {
                        // attr Target {block}\.ev3p
                        block.attribute("Target").setValue(
                          target.fn.setName +
                          "\\.ev3p");
                      }
                      if (target.parameters) {
                        block.children().each(

                          function(parameter, i) {
                            if (i === 0 ||
                              parameter.localName() !==
                              "ConfigurableMethodTerminal"
                            ) {
                              return;
                            }
                            i--;
                            if (target.parameters[i] &&
                              target.parameters[i].fn
                            ) {
                              var terminal =
                                parameter.child(
                                  "Terminal");
                              var direction =
                                target.parameters[i]
                                .fn.setParameterDirection ||
                                terminal.attribute(
                                  "Direction").toString();
                              // Terminal attr Id {direction}\ Number|Logic|Text|Numeric\ Array|Logic\Array
                              if (target.parameters[
                                  i].fn.setParameterDirection ||
                                target.parameters[i]
                                .fn.setParameterDataType
                              ) {
                                var blockIndex =
                                  target.blockIndex;
                                var dataType =
                                  target.parameters[
                                    i].fn.setParameterDataType ||
                                  terminal.attribute(
                                    "DataType").toString();
                                var name =
                                  computeName(
                                    blockIndex, i,
                                    direction,
                                    dataType);
                                terminal.attribute(
                                  "Id").setValue(
                                  name.replace(
                                    / /g, "\\ "));
                              }
                              // attr ConfiguredValue {defaultValue}
                              if (target.parameters[
                                  i].fn.setParameterDefaultValue &&
                                direction ===
                                "Input") {
                                parameter.attribute(
                                  "ConfiguredValue"
                                ).setValue(target
                                  .parameters[i].fn
                                  .setParameterDefaultValue
                                );
                              }
                              // Terminal attr Direction
                              // if (target.parameters[i].fn.setParameterDirection) {
                              // 	parameter.child("Terminal").attribute("Direction").setValue(target.parameters[i].fn.setParameterDirection);
                              // }
                              // Terminal attr DataType
                              if (target.parameters[
                                  i].fn.setParameterDataType) {
                                terminal.attribute(
                                  "DataType").setValue(
                                  target.parameters[
                                    i].fn.setParameterDataType
                                );
                              }
                            }
                          });
                      }
                    }
                    break;
                }
              });
            }
            break;
            // MBXML //
          case "mbxml":
            try {
              var change = getChange(zipEntry.name);
              if (change) {
                var polyGroup = xml.child("PolyGroups").child(
                  "PolyGroup");
                if (change.fn) {
                  if (change.fn.setName) {
                    // fileName {block}.ev3p.mbxml
                    fileName = change.fn.setName +
                      ".ev3p.mbxml";
                  }
                  if (change.fn.setIconBaseName) {
                    // attr IconBaseName {icon} eg: PolyGroup_000_MyBlockRed
                    polyGroup.attribute("IconBaseName").setValue(
                      change.fn.setIconBaseName.replace(
                        /((\/assets\/)|(_Diagram\.png))/g,
                        ""));
                  }
                }
                if (change.parameters) {
                  var block = polyGroup.child("Block");
                  var parameterIndex = -1;
                  block.children().each(function(
                    parameter) {
                    if (parameter.localName() ===
                      "ParamInfo") {
                      parameterIndex++;
                      if (change.parameters[
                          parameterIndex]) {


                        var direction = change.parameters[
                            parameterIndex].fn.setParameterDirection ||
                          parameter.attribute(
                            "Direction").toString();
                        if (change.parameters[
                            parameterIndex].fn.setParameterDirection ||
                          change.parameters[
                            parameterIndex].fn.setParameterDataType
                        ) {
                          var blockIndex = change.blockIndex;
                          var dataType = change.parameters[
                              parameterIndex].fn.setParameterDataType ||
                            parameter.attribute(
                              "DataType").toString();
                          var name = computeName(
                            blockIndex,
                            parameterIndex,
                            direction, dataType);
                          // attr Name {name} || {direction} {dataType}
                          parameter.attribute("Name")
                            .setValue(name);
                        }


                        if (change.parameters[
                            parameterIndex].fn.setParameterDisplayName) {
                          // attr DisplayName {name} || ""
                          parameter.attribute(
                            "DisplayName").setValue(
                            change.parameters[
                              parameterIndex].fn.setParameterDisplayName
                          );
                        }
                        if (change.parameters[
                            parameterIndex].fn.setParameterIdentification) {
                          // attr Identification {identification} eg: Identification_000_A.png
                          parameter.attribute(
                            "Identification").setValue(
                            change.parameters[
                              parameterIndex].fn.setParameterIdentification
                            .replace(/\/assets\//g,
                              ""));
                        }
                        if (change.parameters[
                            parameterIndex].fn.setParameterDataType) {
                          // attr DataType {dataType}
                          parameter.attribute(
                            "DataType").setValue(
                            change.parameters[
                              parameterIndex].fn.setParameterDataType
                          );
                        }
                        if (change.parameters[
                            parameterIndex].fn.setParameterDefaultValue &&
                          direction === "Input") {
                          // attr DefaultValue {defaultValue}
                          parameter.attribute(
                            "DefaultValue").setValue(
                            change.parameters[
                              parameterIndex].fn.setParameterDefaultValue
                          );
                        }
                        if (change.parameters[
                            parameterIndex].fn.setParameterConfiguration) {
                          // attr Configuration {configuration} || delete
                          if (parameter.attribute(
                              "Configuration").length()) {
                            parameter.attribute(
                              "Configuration").setValue(
                              change.parameters[
                                parameterIndex].fn.setParameterConfiguration
                            );
                          } else {
                            parameter.addAttribute({
                              name: "Configuration",
                              value: change.parameters[
                                  parameterIndex]
                                .fn.setParameterConfiguration,
                            });
                          }
                        } else if (parameter.attribute(
                            "Configuration").length()) {
                          parameter.removeAttribute(
                            "Configuration");
                        }
                        if (change.parameters[
                            parameterIndex].fn.setParameterMinValue) {
                          // attr MinValue {minValue} || delete
                          if (parameter.attribute(
                              "MinValue").length()) {
                            parameter.attribute(
                              "MinValue").setValue(
                              change.parameters[
                                parameterIndex].fn.setParameterMinValue
                            );
                          } else {
                            parameter.addAttribute({
                              name: "MinValue",
                              value: change.parameters[
                                  parameterIndex]
                                .fn.setParameterMinValue,
                            });
                          }
                        } else if (parameter.attribute(
                            "MinValue").length()) {
                          parameter.removeAttribute(
                            "MinValue");
                        }
                        if (change.parameters[
                            parameterIndex].fn.setParameterMaxValue) {
                          // attr MaxValue {minValue} || delete
                          if (parameter.attribute(
                              "MaxValue").length()) {
                            parameter.attribute(
                              "MaxValue").setValue(
                              change.parameters[
                                parameterIndex].fn.setParameterMaxValue
                            );
                          } else {
                            parameter.addAttribute({
                              name: "MaxValue",
                              value: change.parameters[
                                  parameterIndex]
                                .fn.setParameterMaxValue,
                            });
                          }
                        } else if (parameter.attribute(
                            "MaxValue").length()) {
                          parameter.removeAttribute(
                            "MaxValue");
                        }
                      }
                    }
                  });
                }
              }
            } catch (e) {
              console.log(e)
            }
            break;
        }
        refactored.push({
          name: fileName,
          content: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
            xml.toString()
        });
      } else {
        refactored.push({
          name: fileName,
          content: result
        });
      }
      currentFile++;
      console.log(currentFile / numberOfFiles);
      if (currentFile / numberOfFiles == 1) {
        var refactoredZip = new jsZIP();
        for (var i = 0; i < refactored.length; i++) {
          refactoredZip.file(refactored[i].name,
            refactored[i].content);
        }
        refactoredZip.generateAsync({
          type: "blob"
        }).then(function(content) {
          saveAs(content, projects[
              currentProjectIndex].name +
            "-Save.ev3");
        });
      }
    });
  });
});

$('#undo').click(function() {
  if (!projects[currentProjectIndex].undo.length) {
    return;
  }
  var action = projects[currentProjectIndex].undo[projects[
    currentProjectIndex].undo.length - 1];
  projects[currentProjectIndex].redo.push(projects[
    currentProjectIndex].undo.pop());
  switch (action.fn) {
    case "setName":
      projects[currentProjectIndex].blocks[action.blockIndex].setName(
        action.from, true);
      break;
    case "setDescription":
      projects[currentProjectIndex].blocks[action.blockIndex].setDescription(
        action.from, true);
      break;
    case "setIconBaseName":
      projects[currentProjectIndex].blocks[action.blockIndex].setIconBaseName(
        action.from, true);
      break;
    case "setParameterName":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterName(
        action.parameterIndex, action.from, true);
      break;
    case "setParameterDisplayName":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterDisplayName(
        action.parameterIndex, action.from, true);
      break;
    case "setParameterDirection":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterDirection(
        action.parameterIndex, action.from, true);
      break;
    case "setParameterIdentification":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterIdentification(
        action.parameterIndex, action.from, true);
      break;
    case "setParameterDataType":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterDataType(
        action.parameterIndex, action.from, true);
      break;
    case "setParameterDefaultValue":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterDefaultValue(
        action.parameterIndex, action.from, true);
      break;
    case "setParameterConfiguration":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterConfiguration(
        action.parameterIndex, action.from, true);
      break;
    case "setParameterMinValue":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterMinValue(
        action.parameterIndex, action.from, true);
      break;
    case "setParameterMaxValue":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterMaxValue(
        action.parameterIndex, action.from, true);
      break;
    default:
      console.error(action.fn);
  }
});

$('#redo').click(function() {
  if (!projects[currentProjectIndex].redo.length) {
    return;
  }
  var action = projects[currentProjectIndex].redo[projects[
    currentProjectIndex].redo.length - 1];
  projects[currentProjectIndex].undo.push(projects[
    currentProjectIndex].redo.pop());
  switch (action.fn) {
    case "setName":
      projects[currentProjectIndex].blocks[action.blockIndex].setName(
        action.to, true);
      break;
    case "setDescription":
      projects[currentProjectIndex].blocks[action.blockIndex].setDescription(
        action.to, true);
      break;
    case "setIconBaseName":
      projects[currentProjectIndex].blocks[action.blockIndex].setIconBaseName(
        action.to, true);
      break;
    case "setParameterName":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterName(
        action.parameterIndex, action.to, true);
      break;
    case "setParameterDisplayName":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterDisplayName(
        action.parameterIndex, action.to, true);
      break;
    case "setParameterDirection":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterDirection(
        action.parameterIndex, action.to, true);
      break;
    case "setParameterIdentification":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterIdentification(
        action.parameterIndex, action.to, true);
      break;
    case "setParameterDataType":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterDataType(
        action.parameterIndex, action.to, true);
      break;
    case "setParameterDefaultValue":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterDefaultValue(
        action.parameterIndex, action.to, true);
      break;
    case "setParameterConfiguration":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterConfiguration(
        action.parameterIndex, action.to, true);
      break;
    case "setParameterMinValue":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterMinValue(
        action.parameterIndex, action.to, true);
      break;
    case "setParameterMaxValue":
      projects[currentProjectIndex].blocks[action.blockIndex].setParameterMaxValue(
        action.parameterIndex, action.to, true);
      break;
    default:
      console.error(action.fn);
  }
});

// CONTEXT MENU //

$('body').contextmenu(function(e) {
  if (timeContextMenu) {
    return false;
  }
  $('.contextmenu').css('display', 'block');
  $('.contextmenu').css('top', e.pageY + 30);
  $('.contextmenu').css('left', e.pageX + 30);
  $('.contextmenu').css('width', '150px');
  $('.contextmenu').css('opacity', '0');
  $('.contextmenu').stop();
  timeContextMenu = Date.now();
  $('.contextmenu').animate({
    top: e.pageY + "px",
    left: e.pageX + "px",
    opacity: '1',
    width: '210px'
  });
  return false;
});

$('.contextmenu').blur(function() {
  $('.contextmenu').css('display', 'none');
  $('.contextmenu').css('top', '');
  $('.contextmenu').css('left', '');
});

$('#arrange').click(function() {
  displayRelationships();
  var nodes = $('.my-block');
  var edges = jsPlumb.getAllConnections();
  var g = new dagreD3.graphlib.Graph();
  g.setGraph({});
  g.setDefaultEdgeLabel(function() {
    return {};
  });
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    g.setNode(n.id, {
      width: parseInt($(n).css('width')),
      height: parseInt($(n).css('height'))
    });
  }
  for (var i = 0; i < edges.length; i++) {
    var c = edges[i];
    g.setEdge(c.source.id, c.target.id);
  }
  dagreD3.dagre.layout(g, {
    // graph: {
    // 	rankdir: "LR",
    // 	align: "LR",
    // 	nodesep: 50,
    // 	edgesep: 10,
    // 	ranksep: 50,
    // 	marginx: 0,
    // 	marginy: 0
    // },
    // node: {
    // 	width: 0,
    // 	height: 0
    // },
    // edge: {
    // 	weight: 1,
    // 	width: 0,
    // 	height: 0,
    // 	labelpos: "r",
    // 	labeloffset: 0
    // }
  });
  g.nodes().forEach(function(v) {
    $("#" + v).css("left", g.node(v).x + "px");
    $("#" + v).css("top", (g.node(v).y + (window.innerHeight /
      3)) + "px");
  });
  jsPlumb.repaintEverything();
});

$('#search').click(function() {
  var original = [];
  $('.my-block').each(function(i, element) {
    original[i] = {
      left: $(element).css('left'),
      top: $(element).css('top')
    };
  });
  var typingTimer;
  var doneTypingInterval = 100;
  var $div = $('<div></div>')
    .addClass('dialog')
    .append(
      '<p style="text-align: left;"><i class="fa fa-search fa-lg"></i> Search</p>'
    )
    .append(
      $('<input/>')
      .attr('id', 'search-input')
      .attr('type', 'text')
      .attr('placeholder', 'Search for My Block name')
      .on('keydown', function() {
        if (typingTimer) {
          clearTimeout(typingTimer);
        }
      })
      .on('keyup', function() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
      })
    );

  function doneTyping() {
    var search = $div.find('#search-input').val();
    var targetX = null;
    var targetY = null;
    for (var i = 0; i < projects[currentProjectIndex].blocks.length; i++) {
      var regex = new RegExp(search, 'i');
      if (projects[currentProjectIndex].blocks[i].name.match(
          regex)) {
        targetX = parseInt(projects[currentProjectIndex].blocks[i]
          .dom.css('left'));
        targetY = parseInt(projects[currentProjectIndex].blocks[i]
          .dom.css('top'));
        break;
      }
    }
    if (targetX && targetY) {
      var x = window.innerWidth / 2;
      var y = window.innerHeight / 2;
      var dx = x - targetX;
      var dy = y - targetY;
      $('#data-wires').css('display', 'none');
      $('.my-block').animate({
        left: "+=" + dx + "px",
        top: "+=" + dy + "px",
      }, 500, function() {
        $('#data-wires').css('display', 'block');
        jsPlumb.repaintEverything();
      });
    }
  }
  vex.open({
    message: $div,
    afterClose: function($context, result) {
      if (!result.value) {
        $('.my-block').each(function(i, element) {
          $(element).css('left', original[i].left);
          $(element).css('top', original[i].top);
        });
      }
    }
  })
});

// FILE HANDLING //

function handleFile(file) {
  if (!file) {
    return;
  }
  $('.file-upload').css('display', 'block');
  $('#fileUploadClose').css('display', 'none');
  $('#fileUploadErrors').html('');
  var errors = [];
  if (file.size > 625000) {
    distinctPush(errors, "Files size cannot exceed 5Mb.");
  }
  var nameLength = file.name.length;
  var indexOfDot = file.name.lastIndexOf(".");
  var extension = file.name.substring(indexOfDot + 1);
  if (indexOfDot == -1 || indexOfDot == nameLength - 1 || ["ev3"].indexOf(
      extension) === -1) {
    distinctPush(errors, "Files can only be of type \"ev3\".");
  }
  if (errors.length) {
    showWarningInFileUpload(errors);
  } else {
    var indexOfDot = file.name.lastIndexOf(".");
    var extension = file.name.substring(indexOfDot + 1);
    switch (extension) {
      case "ev3":
        projects.push({
          name: file.name.substring(0, indexOfDot),
          type: extension,
          raw: file,
          blocks: [],
          relationships: {},
          undo: [],
          redo: [],
          getBlockByName: function(_name) {
            for (var i = 0; i < this.blocks.length; i++) {
              if (this.blocks[i].name === _name) {
                return this.blocks[i];
              }
            }
            return;
          }
        });
        $('.projects').children().each(function() {
          $(this).removeClass("selected");
        });
        $('.projects').append(
          $('<li></li>')
          .addClass("selected")
          .append(
            $('<span></span>')
            .html(projects[projects.length - 1].name)
          )
          .append(
            $('<i class="fa fa-close"></i>')
            .click(function() {
              var index = $(this).parent().index();
              projects.splice(index, 1);
              if (currentProjectIndex >= projects.length) {
                currentProjectIndex--;
              }
              $(this).parent().remove();
              flushProjectCanvas();
              if (projects.length == 0) {
                currentProjectIndex = -1;
              }
              if (currentProjectIndex >= 0) {
                displayProject(currentProjectIndex);
              }
            })
          )
          .click(function() {
            if (!$(this).hasClass('selected')) {
              var index = $(this).index();
              currentProjectIndex = index;
              flushProjectCanvas();
              displayProject(index);
            }
          })
        );
        handleEV3(file, projects.length - 1);
        break;
    }
  }
}

function handleEV3(file, projectIndex) {
  jsZIP.loadAsync(file)
    .then(function(zip) {
      currentProjectIndex = projectIndex;
      projects[projectIndex].zip = zip;
      flushProjectCanvas();
      processEV3(file, zip, projectIndex);
    }, function(e) {
      errors.push("File is corrupt or unreadable.");
      showWarningInFileUpload(errors);
    });
}

function processEV3(file, zip, projectIndex) {
  var numberOfFiles = objectLength(zip.files);
  var currentFile = 0;
  zip.forEach(function(relativePath, zipEntry) {
    zip.file(zipEntry.name).async("string").then(function(result) {
      var indexOfDot = zipEntry.name.indexOf(".");
      var extension = zipEntry.name.substring(indexOfDot + 1);
      var name = zipEntry.name.substring(0, indexOfDot);
      switch (extension) {
        case "ev3p":
          processEV3P(result, projectIndex, extension, name);
          break;
        case "ev3p.mbxml":
          processEV3PMBXML(result, projectIndex, extension,
            name);
          break;
      }
      if (++currentFile / numberOfFiles == 1) {
        $('.file-upload').css('display', 'none');
        $('#fileUploadClose').css('display', 'none');
        $('#fileUploadErrors').html('');
        $('#arrange').click();
      }
    });
  });
}

function processEV3P(xml, projectIndex, extension, name) {
  var ev3p = new XML(xml);
  var blockDiagram = ev3p.child('Namespace').child(
    'VirtualInstrument').child('BlockDiagram');
  var relationships = [];

  blockDiagram.children().each(function(item, index) {
    switch (item.localName().toString()) {
      case "ConfigurableMethodCall":
        var target = item.attribute('Target').toString().replace(
          "\\", "");
        var indexOfDot = target.lastIndexOf(".");
        var dependencyExtension = target.substring(indexOfDot + 1);
        if (dependencyExtension == "ev3p") {
          var dependencyName = target.substring(0, indexOfDot);
          distinctPush(relationships, dependencyName);
        }
        break;
    }
  });

  projects[projectIndex].relationships[name] = relationships;
}

function processEV3PMBXML(xml, projectIndex, extension, name) {
  var ev3p_mbxml = new XML(xml);

  switch (extension) {
    case "ev3p.mbxml":
      var polyGroup = ev3p_mbxml.child('PolyGroups').child(
        'PolyGroup');
      var block = polyGroup.child('Block');
      var blockIndex = projects[projectIndex].blocks.length;
      projects[projectIndex].blocks.push({
        name: name,
        originalName: name,
        description: null,
        iconBaseName: 'assets/import/' + polyGroup.attribute(
          "IconBaseName").toString() + '_Diagram.png',
        params: [],
        uses: [],
        usedBy: [],
        setName: function(name, ignoreUndo) {
          if (!ignoreUndo) {
            projects[projectIndex].undo.push({
              blockIndex: blockIndex,
              fn: "setName",
              from: this.name,
              to: name
            });
          }
          this.name = name;
          this.dom.find('.blockName').css('display', 'none');
          this.dom.find('.blockName').fadeIn();
          this.dom.find('.blockName').html(name);
          console.log('setName')
        },
        setDescription: function(description, ignoreUndo) {
          if (!ignoreUndo) {
            projects[projectIndex].undo.push({
              blockIndex: blockIndex,
              fn: "setDescription",
              from: this.description,
              to: description
            });
          }
          this.description = description;
          console.log('setDescription')
        },
        setIconBaseName: function(iconBaseName, ignoreUndo) {
          if (!ignoreUndo) {
            projects[projectIndex].undo.push({
              blockIndex: blockIndex,
              fn: "setIconBaseName",
              from: this.iconBaseName,
              to: iconBaseName
            });
          }
          this.iconBaseName = iconBaseName;
          this.dom.find('.blockIcon').css('display', 'none');
          this.dom.find('.blockIcon').fadeIn();
          this.dom.find('.blockIcon').attr('src',
            'assets/import/' + iconBaseName);
          console.log('setIconBaseName')
        },
        setParameterName: function(parameterIndex, name,
          ignoreUndo) {
          if (!ignoreUndo) {
            projects[projectIndex].undo.push({
              blockIndex: blockIndex,
              parameterIndex: parameterIndex,
              fn: "setParameterName",
              from: this.params[parameterIndex].name,
              to: name
            });
          }
          this.params[parameterIndex].name = name;
          $(this.dom.find('.parameterIcon')[parameterIndex]).attr(
            'title', name);
          console.log('setParameterName')
        },
        setParameterDisplayName: function(parameterIndex,
          displayName, ignoreUndo) {
          if (!ignoreUndo) {
            projects[projectIndex].undo.push({
              blockIndex: blockIndex,
              parameterIndex: parameterIndex,
              fn: "setParameterDisplayName",
              from: this.params[parameterIndex].displayName,
              to: displayName
            });
          }
          this.params[parameterIndex].displayName = displayName;
          $(this.dom.find('.parameterIcon')[parameterIndex]).attr(
            'title', displayName);
          console.log('setParameterDisplayName')
        },
        setParameterDirection: function(parameterIndex, direction,
          ignoreUndo) {
          if (!ignoreUndo) {
            projects[projectIndex].undo.push({
              blockIndex: blockIndex,
              parameterIndex: parameterIndex,
              fn: "setParameterDirection",
              from: this.params[parameterIndex].direction,
              to: direction
            });
          }
          this.params[parameterIndex].direction = direction;
          $(this.dom.find('.parameterDataType')[parameterIndex])
            .attr('src', "assets/Palette_MyBlock_Parameter_" +
              direction + "_" + this.params[parameterIndex].dataType +
              ".png");
          $(this.dom.find('.parameterDataType')[parameterIndex])
            .attr('title', direction + " " + this.params[
              parameterIndex].dataType);
          console.log('setParameterDirection')
        },
        setParameterIdentification: function(parameterIndex,
          identification, ignoreUndo) {
          if (!ignoreUndo) {
            projects[projectIndex].undo.push({
              blockIndex: blockIndex,
              parameterIndex: parameterIndex,
              fn: "setParameterIdentification",
              from: this.params[parameterIndex].identification,
              to: identification
            });
          }
          this.params[parameterIndex].identification =
            identification;
          $(this.dom.find('.parameterIcon')[parameterIndex]).css(
            'display', 'none');
          $(this.dom.find('.parameterIcon')[parameterIndex]).fadeIn();
          $(this.dom.find('.parameterIcon')[parameterIndex]).attr(
            'src', 'assets/import/' + identification);
          console.log('setParameterIdentification')
        },
        setParameterDataType: function(parameterIndex, dataType,
          ignoreUndo) {
          if (!ignoreUndo) {
            projects[projectIndex].undo.push({
              blockIndex: blockIndex,
              parameterIndex: parameterIndex,
              fn: "setParameterDataType",
              from: this.params[parameterIndex].dataType,
              to: dataType
            });
          }
          this.params[parameterIndex].dataType = dataType;
          $(this.dom.find('.parameterDataType')[parameterIndex])
            .attr('src', 'assets/Palette_MyBlock_Parameter_' +
              this.params[parameterIndex].direction + '_' +
              dataType + '.png');
          console.log('setParameterDataType')
        },
        setParameterDefaultValue: function(parameterIndex,
          defaultValue, ignoreUndo) {
          if (!ignoreUndo) {
            projects[projectIndex].undo.push({
              blockIndex: blockIndex,
              parameterIndex: parameterIndex,
              fn: "setParameterDefaultValue",
              from: this.params[parameterIndex].defaultValue,
              to: defaultValue
            });
          }
          this.params[parameterIndex].defaultValue =
            defaultValue;
          console.log('setParameterDefaultValue')
        },
        setParameterConfiguration: function(parameterIndex,
          configuration, ignoreUndo) {
          if (!ignoreUndo) {
            projects[projectIndex].undo.push({
              blockIndex: blockIndex,
              parameterIndex: parameterIndex,
              fn: "setParameterConfiguration",
              from: this.params[parameterIndex].configuration,
              to: configuration
            });
          }
          this.params[parameterIndex].configuration =
            configuration;
          console.log('setParameterConfiguration')
        },
        setParameterMinValue: function(parameterIndex, minValue,
          ignoreUndo) {
          if (!ignoreUndo) {
            projects[projectIndex].undo.push({
              blockIndex: blockIndex,
              parameterIndex: parameterIndex,
              fn: "setParameterMinValue",
              from: this.params[parameterIndex].minValue,
              to: minValue
            });
          }
          this.params[parameterIndex].minValue = minValue;
          console.log('setParameterMinValue')
        },
        setParameterMaxValue: function(parameterIndex, maxValue,
          ignoreUndo) {
          if (!ignoreUndo) {
            projects[projectIndex].undo.push({
              blockIndex: blockIndex,
              parameterIndex: parameterIndex,
              fn: "setParameterMaxValue",
              from: this.params[parameterIndex].maxValue,
              to: maxValue
            });
          }
          this.params[parameterIndex].maxValue = maxValue;
          console.log('setParameterMaxValue')
        }
      });
      block.children().each(function(item, index) {
        switch (item.localName().toString()) {
          case "Description":
            projects[projectIndex].blocks[blockIndex].description =
              item.text().toString();
            return;
          case "ParamInfo":
            projects[projectIndex].blocks[blockIndex].params.push({
              name: item.attribute('Name').toString(),
              displayName: item.attribute('DisplayName').toString(),
              direction: item.attribute('Direction').toString(),
              identification: 'assets/import/' + item.attribute(
                'Identification').toString(),
              dataType: item.attribute('DataType').toString(),
              defaultValue: item.attribute('DefaultValue').toString(),
              configuration: item.attribute('Configuration').toString(),
              minValue: item.attribute('MinValue').toString(),
              maxValue: item.attribute('MaxValue').toString()
            });
            return;
        }
      });
      diplayBlock(projectIndex, blockIndex);
      break;
  }
}

function showWarningInFileUpload(errors) {
  for (var i = 0; i < errors.length; i++) {
    $('.file-upload').find('#errors').append($("<p></p>")
      .html(errors[i]));
  }
  $('#fileUploadClose').css('display', 'block');
}

// MY BLOCK EDITOR //

function displayProject(projectIndex) {
  $('.projects').children().each(function() {
    $(this).removeClass("selected");
  });
  $('.projects').children().eq(projectIndex).addClass("selected");
  for (var i = 0; i < projects[projectIndex].blocks.length; i++) {
    diplayBlock(projectIndex, i);
  }
  $('#arrange').click();
}

function displayRelationships() {
  jsPlumb.detachEveryConnection();
  jsPlumb.deleteEveryEndpoint();
  for (var i = 0; i < projects[currentProjectIndex].blocks.length; i++) {
    var block = projects[currentProjectIndex].blocks[i];
    block.uses = [];
    block.usedBy = [];
  }
  for (var i = 0; i < projects[currentProjectIndex].blocks.length; i++) {
    var block = projects[currentProjectIndex].blocks[i];
    var blockName = block.name;
    var relationships = projects[currentProjectIndex].relationships[
      blockName];
    block.uses = relationships;
    for (var n = 0; n < relationships.length; n++) {
      distinctPush(projects[currentProjectIndex].getBlockByName(
        relationships[n]).usedBy, block.name);
      jsPlumb.connect({
        source: blockName,
        target: relationships[n],
        anchors: ["Right", "Left"],
        endpoint: "Blank",
        connector: ["Flowchart", {
          stub: 30,
          alwaysRespectStubs: false,
          gap: 0,
          midpoint: 0.5,
          cornerRadius: 1
        }],
        paintStyle: {
          strokeStyle: "#DCDCDC",
          lineWidth: 2,
          outlineColor: "#A4A4A4",
          outlineWidth: 1
        }
      });
    }
  }
}

function flushProjectCanvas() {
  $('#data-wires').empty();
  $('.workspace').html('<div id="data-wires"></div>');
  jsPlumb.setContainer($("#data-wires"));
}

function diplayBlock(projectIndex, blockIndex) {
  var block = projects[projectIndex].blocks[blockIndex];
  var $block = $('<div></div>')
    .addClass('my-block')
    .css('width', (55 + (31 * (block.params.length + ((block.params.length <
      10) ? 1 : 0))) + 26) + 'px')
    .css('height', 89 + 'px')
    .css('z-index', blockIndex + 1)
    .on('mousedown', function(e) {
      switch (e.which) {
        case 1:
          drag = {
            prevX: e.pageX,
            prevY: e.pageY
          };

          var myZIndex = $(this).css('z-index');
          var $myBlocks = $('.my-block');
          $myBlocks.each(function(i, element, array) {
            if (i != blockIndex) {
              var zIndex = $(element).css('z-index');
              if (parseInt(zIndex) > parseInt(myZIndex)) {
                $(element).css('z-index', zIndex - 1);
              }
            }
          });
          $(this).css('z-index', $myBlocks.length);
          break;
      }
    })
    .append(
      $('<img></img>')
      .addClass('blockStartBackground')
      .addClass('rigid')
      .attr('src', 'assets/Palette_MyBlock_Start.png')
      .on('dragstart', function(e) {
        e.preventDefault();
      })
    )
    .append(
      $('<img></img>')
      .addClass('blockStartDataWire')
      .addClass('rigid')
      .attr('src', 'assets/Palette_MyBlock_Start_DataWire.png')
      .on('dragstart', function(e) {
        e.preventDefault();
      })
      .on('mouseleave', function() {
        if (!block.usedBy.length) {
          return;
        }
        $(this).removeClass('blockStartDataWireHover');
      })
      .on('mouseenter', function() {
        if (!block.usedBy.length) {
          return;
        }
        $(this).addClass('blockStartDataWireHover');
      })
      .click(function() {
        if (!block.usedBy.length) {
          return;
        }
        var $div = $('<div></div>')
          .addClass('dialog')
          .append(
            $('<p></p>')
            .html('<b>' + block.name +
              '</b> is used by the My Blocks:')
          );
        for (var i = 0; i < block.usedBy.length; i++) {
          $div
            .append(
              $('<p></p>')
              .append(
                $('<b></b>')
                .html(block.usedBy[i])
              )
            )
        }
        vex.alert({
          message: $div
        });
      })
    )
    .append(
      $('<img></img>')
      .addClass('blockIcon')
      .addClass('rigid')
      .attr('src', block.iconBaseName)
      .on('dragstart', function(e) {
        e.preventDefault();
      })
      .click(function() {
        editBlockIcon.apply(this, [block, blockIndex]);
      })
    );
  $('.workspace').append($block);
  for (var i = 0; i < block.params.length; i++) {
    (function(parameterIndex) {
      $block.append(
          $('<img></img>')
          .addClass('parameterBackground')
          .addClass('rigid')
          .css('left', (55 + (31 * i)) + 'px')
          .attr('title', block.params[parameterIndex].displayName ||
            block.params[parameterIndex].name)
          .attr('src', 'assets/Palette_MyBlock_Parameter.png')
          .on('dragstart', function(e) {
            e.preventDefault();
          })
        )
        .append(
          $('<img></img>')
          .addClass('parameterDataType')
          .addClass('rigid')
          .css('left', (55 + (31 * i)) + 'px')
          .attr('title', block.params[parameterIndex].direction +
            " " + block.params[parameterIndex].dataType)
          .attr('src', 'assets/Palette_MyBlock_Parameter_' + block.params[
              i].direction + '_' + block.params[i].dataType +
            '.png')
          .on('dragstart', function(e) {
            e.preventDefault();
          })
          .click(function() {
            editParameter(block, blockIndex, parameterIndex);
          })
        )
        .append(
          $('<img></img>')
          .addClass('parameterIcon')
          .addClass('rigid')
          .css('left', (55 + (31 * i) + 5) + 'px')
          .attr('title', block.params[parameterIndex].displayName ||
            block.params[parameterIndex].name)
          .attr('src', block.params[i].identification)
          .on('dragstart', function(e) {
            e.preventDefault();
          })
          .click(function() {
            editParameterIcon.apply(this, [block, blockIndex,
              parameterIndex
            ]);
          })
        )
    })(i);
  }
  if (block.params.length < 10) {
    $block.append(
      $('<img></img>')
      .addClass('parameterBackground')
      .addClass('rigid')
      .css('left', (55 + (31 * (block.params.length))) + 'px')
      .attr('src', 'assets/Palette_MyBlock_Parameter.png')
      .on('dragstart', function(e) {
        e.preventDefault();
      })
    )
    $block.append(
      $('<img></img>')
      .addClass('parameterAdd')
      .addClass('rigid')
      .css('left', (55 + (31 * (block.params.length))) + 'px')
      .attr('src', 'assets/Palette_MyBlock_AddParameter.png')
      .data('src0', 'assets/Palette_MyBlock_AddParameter.png')
      .data('src1', 'assets/Palette_MyBlock_AddParameter_Hover.png')
      .data('src2',
        'assets/Palette_MyBlock_AddParameter_Active.png')
      .on('mouseenter', function() {
        $(this).attr('src', $(this).data('src1'))
      })
      .on('mousedown', function() {
        $(this).attr('src', $(this).data('src2'))
      })
      .on('mouseup', function() {
        $(this).attr('src', $(this).data('src1'))
      })
      .on('mouseleave', function() {
        $(this).attr('src', $(this).data('src0'))
      })
      .click(function() {

      })
      .on('dragstart', function(e) {
        e.preventDefault();
      })
    )
  }
  $block.append(
      $('<img></img>')
      .addClass('blockEndBackground')
      .addClass('rigid')
      .css('left', (55 + (31 * (block.params.length + ((block.params.length <
        10) ? 1 : 0)))) + 'px')
      .attr('src', 'assets/Palette_MyBlock_End.png')
      .on('dragstart', function(e) {
        e.preventDefault();
      })
    )
    .append(
      $('<img></img>')
      .addClass('blockEndDataWire')
      .addClass('rigid')
      .attr('src', 'assets/Palette_MyBlock_End_DataWire.png')
      .on('mouseleave', function() {
        if (!block.uses.length) {
          return;
        }
        $(this).removeClass('blockStartDataWireHover');
      })
      .on('mouseenter', function() {
        if (!block.uses.length) {
          return;
        }
        $(this).addClass('blockStartDataWireHover');
      })
      .click(function() {
        if (!block.uses.length) {
          return;
        }
        var $div = $('<div></div>')
          .addClass('dialog')
          .append(
            $('<p></p>')
            .html('<b>' + block.name + '</b> uses the My Blocks:')
          );
        for (var i = 0; i < block.uses.length; i++) {
          $div
            .append(
              $('<p></p>')
              .append(
                $('<b></b>')
                .html(block.uses[i])
              )
            )
        }
        vex.alert({
          message: $div
        });
      })
      .on('dragstart', function(e) {
        e.preventDefault();
      })
    )
    .append(
      $('<div></div>')
      .addClass('blockName')
      .addClass('rigid')
      .html(block.name)
      .on('dragstart', function(e) {
        e.preventDefault();
      })
      .click(function() {
        editBlock(block, blockIndex);
      })
    )
  projects[projectIndex].blocks[blockIndex].dom = $block;
  jsPlumb.setId($block, block.name);
  jsPlumb.draggable($block);
}

function editBlock(block, blockIndex) {
  var $div = $('<div></div>')
    .addClass('dialog')
    .append(
      $('<input required/>')
      .attr('id', 'block-name')
      .attr('type', 'text')
      .attr('maxlength', '26')
      .attr('placeholder', 'My Block Name')
      .val(block.name)
      .on('input propertychange paste', function(e) {
        var userInput = $(this).val();
        var isValid = !(userInput.match(/[^A-Za-z0-9_]/));
        var isEmpty = userInput.length === 0;
        if (e.which === 13) {
          $(this).blur();
          return true;
        }
        var exists = false;
        for (var i = 0; i < projects[currentProjectIndex].blocks.length; i++) {
          if (i === blockIndex) {
            continue;
          }
          if (userInput.toLowerCase() === projects[
              currentProjectIndex].blocks[i].name.toLowerCase()) {
            exists = true;
            break;
          }
        }
        if (isEmpty) {
          showWarningInVexDialog('My Block name is required.');
        } else if (exists) {
          showWarningInVexDialog(
            'My Block name is in use. Please pick a unique My Block name.'
          );
        } else if (!isValid) {
          showWarningInVexDialog(
            'The My Block name may only contain the following characters:<br>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789_'
          );
        } else {
          showWarningInVexDialog(null);
        }
        return true;
      })
    )
    .append(
      $('<textarea/>')
      .attr('id', 'block-description')
      .attr('placeholder', 'My Block Description')
      .val(block.description)
    )
    .append(
      $('<p></p>')
      .attr('id', 'text-warning')
      .addClass('warning')
      .css('display', 'none')
      .html('')
    );
  vex.open({
    message: $div,
    afterClose: function($content, result) {
      if (result.value) {
        var currentName = $content.find('#block-name').val();
        var currentDescription = $content.find(
          '#block-description').val();
        if (block.name !== currentName) {
          projects[currentProjectIndex].blocks[blockIndex].setName(
            currentName);
        }
        if (block.description !== currentDescription) {
          projects[currentProjectIndex].blocks[blockIndex].setDescription(
            currentDescription);
        }
      }
    }
  });
}

function editBlockIcon(block, blockIndex) {
  var selectedSrc = $(this).attr('src').replace('assets/import/', '');
  var selected = blockIcons.indexOf(selectedSrc);
  var initial = selected;
  var $div = $('<div></div>')
    .addClass('dialog')
  for (var i = 0; i < blockIcons.length; i++) {
    $div.append(
      $('<img></img>')
      .attr('id', i)
      .addClass((i === selected) ? 'selected' : '')
      .addClass('rigid')
      .attr('data-size', 'lg')
      .attr('src', 'assets/import/' + blockIcons[i])
      .click(function() {
        $('.dialog').find('#' + selected).removeClass('selected');
        selected = parseInt($(this).attr('id'));
        $(this).addClass('selected');
      })
      .on('dragstart', function(e) {
        e.preventDefault();
      })
    );
  }
  vex.open({
    message: $div,
    afterClose: function($content, result) {
      if (result.value) {
        if (initial != selected) {
          projects[currentProjectIndex].blocks[blockIndex].setIconBaseName(
            blockIcons[selected]);
        }
      }
    }
  });
}

function editParameter(block, blockIndex, parameterIndex) {
  var $div = $('<div></div>')
    .addClass('dialog')
    .append(
      $('<table></table>')
      .addClass('parameter-setup')
      .append(
        $('<tr></tr>')
        .append(
          $('<td></td>')
          .append(
            $('<p>Parameter Name:</p>')
          )
          .append(
            $('<input/>')
            .attr('id', 'parameter-name')
            .attr('type', 'text')
            .attr('placeholder', 'Parameter Name')
            .val(block.params[parameterIndex].displayName)
          )
          .append(
            $('<p>Parameter Type, Data Type:</p>')
          )
          .append(
            $('<select></select>')
            .attr('id', 'parameter-direction')
            .append(
              $('<option></option>')
              .attr('value', 'Input')
              .attr('selected', block.params[parameterIndex].direction ===
                "Input")
              .html('Input')
            )
            .append(
              $('<option></option>')
              .attr('value', 'Output')
              .attr('selected', block.params[parameterIndex].direction ===
                "Output")
              .html('Output')
            )
            .change(function() {
              var currentDirection = $('#parameter-direction').val();
              var currentDataType = $('#parameter-data-type').val();
              var currentConfig = $(
                "input[name=parameter-configuration]:checked").val();
              showConfiguration(currentDirection, currentDataType,
                currentConfig);
            })
          )
          .append(
            $('<select></select>')
            .attr('id', 'parameter-data-type')
            .append(
              $('<option></option>')
              .attr('value', 'Single')
              .attr('selected', block.params[parameterIndex].dataType ===
                "Single")
              .html('Number')
            )
            .append(
              $('<option></option>')
              .attr('value', 'Boolean')
              .attr('selected', block.params[parameterIndex].dataType ===
                "Boolean")
              .html('Logic')
            )
            .append(
              $('<option></option>')
              .attr('value', 'String')
              .attr('selected', block.params[parameterIndex].dataType ===
                "String")
              .html('Text')
            )
            .append(
              $('<option></option>')
              .attr('value', 'Single[]')
              .attr('selected', block.params[parameterIndex].dataType ===
                "Single[]")
              .html('Numeric Array')
            )
            .append(
              $('<option></option>')
              .attr('value', 'Boolean[]')
              .attr('selected', block.params[parameterIndex].dataType ===
                "Boolean[]")
              .html('Logic Array')
            )
            .change(function() {
              var currentDirection = $('#parameter-direction').val();
              var currentDataType = $('#parameter-data-type').val();
              var currentConfig = $(
                "input[name=parameter-configuration]:checked").val();
              showConfiguration(currentDirection, currentDataType,
                currentConfig);
              showWarningInVexDialog(null);
              switch (currentDataType) {
                case "Single":
                  $('#parameter-default-value').val("0");
                  break;
                case "String":
                  $('#parameter-default-value').val("");
                  break;
                case "Boolean":
                  $('#parameter-default-value').val("False");
                  break;
                case "Single[]":
                  $('#parameter-default-value').val("[1,2,3]");
                  break;
                case "Boolean[]":
                  $('#parameter-default-value').val(
                    "[True,True,False]");
                  break;
              }
            })
          )
          .append(
            $('<p>Default Value:</p>')
          )
          .append(
            $('<input/>')
            .attr('id', 'parameter-default-value')
            .attr('type', 'text')
            .attr('placeholder', 'Default Value')
            .val(block.params[parameterIndex].defaultValue)
            .on('input propertychange paste', function() {
              var currentDataType = $('#parameter-data-type').val();
              var currentDefaultValue = $(this).val();
              showWarningInVexDialog(null);
              if (currentDataType !== "String") {
                if (currentDefaultValue === "") {
                  switch (currentDataType) {
                    case "Single":
                      showWarningInVexDialog(
                        "Please enter a default value as a number."
                      );
                      break;
                    case "Boolean":
                      showWarningInVexDialog(
                        "Please enter a default value as logic. It should be in the format:<br>True or False."
                      );
                      break;
                    case "Single[]":
                      showWarningInVexDialog(
                        "Please enter a default value as a numeric array. It should be in the format:<br>[1,2,3]"
                      );
                      break;
                    case "Boolean[]":
                      showWarningInVexDialog(
                        "Please enter a default value as a logic array. It should be in the format:<br>[True,True,False]"
                      );
                      break;
                  }
                } else {
                  switch (currentDataType) {
                    case "Single":
                      if (!currentDefaultValue.match(
                          /^\-{0,1}[0-9]+$/)) {
                        showWarningInVexDialog(
                          "The number default value cannot contain anything other than numbers."
                        );
                      }
                      break;
                    case "Boolean":
                      if (!currentDefaultValue.toLowerCase().match(
                          /^((True)|(False))$/i)) {
                        showWarningInVexDialog(
                          "The logic default value must either be True or False."
                        );
                      }
                      break;
                    case "Single[]":
                      if (!currentDefaultValue.match(
                          /^\s*\[\s*(\s*\-{0,1}[0-9]+\s*,\s*)*\s*\-{0,1}[0-9]\s*\]\s*$/
                        )) {
                        showWarningInVexDialog(
                          "The numeric array default value should be in the format:<br>[1,2,3]"
                        );
                      }
                      break;
                    case "Boolean[]":
                      if (!currentDefaultValue.match(
                          /^\s*\[\s*(\s*((True)|(False))+\s*,\s*)*\s*((True)|(False))\s*\]\s*$/i
                        )) {
                        showWarningInVexDialog(
                          "The logic array default value should be in the format:<br>[True,True,False]"
                        );
                      }
                      break;
                  }
                }
              }
            })
          )
          .append(
            $('<div></div>')
            .attr('id', 'parameter-range')
            .append(
              $('<p>Minimum and Maximum:</p>')
            )
            .append(
              $('<input/>')
              .attr('id', 'parameter-min')
              .attr('type', 'text')
              .attr('placeholder', 'Minimum value')
              .attr('required', true)
              .val(block.params[parameterIndex].minValue)
              .on('input propertychange paste', function() {
                var currentMin = $(this).val();
                if (!currentMin.match(/^\-{0,1}[0-9]+$/)) {
                  showWarningInVexDialog(
                    "The minimum value cannot contain anything other than numbers."
                  );
                } else {
                  showWarningInVexDialog(null);
                }
              })
            )
            .append(
              $('<input/>')
              .attr('id', 'parameter-max')
              .attr('type', 'text')
              .attr('placeholder', 'Maximum value')
              .attr('required', true)
              .val(block.params[parameterIndex].maxValue)
              .on('input propertychange paste', function() {
                var currentMax = $(this).val();
                if (!currentMax.match(/^\-{0,1}[0-9]+$/)) {
                  showWarningInVexDialog(
                    "The maximum value cannot contain anything other than numbers."
                  );
                } else {
                  showWarningInVexDialog(null);
                }
              })
            )
          )
        )
        .append(
          $('<td></td>')
          .append(
            $('<div></div>')
            .attr('id', 'parameter-configuration')
            .css('display', (block.params[parameterIndex].direction ===
              "Input" && block.params[parameterIndex].dataType ===
              "Single") ? "block" : "none")
            .append(
              $('<p>Parameter Style:</p>')
            )
            .append(
              $('<table></table>')
              .addClass('parameter-configuration')
              .append(
                $('<tr></tr>')
                .append(
                  $('<td></td>')
                  .append(
                    $(
                      '<input type="radio" name="parameter-configuration" value="" ' +
                      ((block.params[parameterIndex].configuration ===
                        '') ? 'checked' : '') + '>')
                  )
                  .append(
                    $('<img></img>')
                    .addClass('rigid')
                    .attr('src',
                      'assets/Palette_MyBlock_Parameter_Style_Single.png'
                    )
                    .click(function() {
                      $('#parameter-range').css('display', 'none');
                      $('#parameter-min').val('null');
                      $('#parameter-max').val('null');
                    })
                    .click(function() {
                      $(this).prev().trigger('click');
                    })
                    .on('dragstart', function(e) {
                      e.preventDefault();
                    })
                  )
                )
                .append(
                  $('<td></td>')
                  .append(
                    $(
                      '<input type="radio" id="parameter-range-hslider" name="parameter-configuration" value="SliderHorizontal.custom" ' +
                      ((block.params[parameterIndex].configuration ===
                        'SliderHorizontal.custom') ? 'checked' : '') +
                      '>')
                    .click(function() {
                      $('#parameter-range').css('display', 'block');
                      $('#parameter-min').val('-100');
                      $('#parameter-max').val('100');
                    })
                  )
                  .append(
                    $('<img></img>')
                    .addClass('rigid')
                    .attr('src',
                      'assets/Palette_MyBlock_Parameter_Style_HSlider.png'
                    )
                    .click(function() {
                      $(this).prev().trigger('click');
                    })
                    .on('dragstart', function(e) {
                      e.preventDefault();
                    })
                  )
                )
              )
              .append(
                $('<tr></tr>')
                .append(
                  $('<td></td>')
                  .append(
                    $(
                      '<input type="radio" id="parameter-range-vslider" name="parameter-configuration" value="SliderVertical.custom" ' +
                      ((block.params[parameterIndex].configuration ===
                        'SliderVertical.custom') ? 'checked' : '') +
                      '>')
                    .click(function() {
                      $('#parameter-range').css('display', 'block');
                      $('#parameter-min').val('-100');
                      $('#parameter-max').val('100');
                    })
                  )
                  .append(
                    $('<img></img>')
                    .addClass('rigid')
                    .attr('src',
                      'assets/Palette_MyBlock_Parameter_Style_VSlider.png'
                    )
                    .click(function() {
                      $(this).prev().trigger('click');
                    })
                    .on('dragstart', function(e) {
                      e.preventDefault();
                    })
                  )
                )
              )
            )
          )
        )
      )
    )
    .append(
      $('<p></p>')
      .attr('id', 'text-warning')
      .addClass('warning')
      .css('display', 'none')
      .html('')
    );
  vex.open({
    message: $div,
    afterClose: function($content, result) {
      if (result.value) {
        var currentName = $content.find("#parameter-name").val()
          .replace(/\s/, "");
        var currentDirection = $content.find(
          "#parameter-direction").val().replace(/\s/, "");
        var currentDataType = $content.find(
          "#parameter-data-type").val().replace(/\s/, "");
        var currentDefaultValue = $content.find(
          "#parameter-default-value").val().replace(/\s/, "");
        var currentConfiguration = $content.find(
            "input[name=parameter-configuration]:checked").val()
          .replace(/\s/, "");
        var currentMin = $content.find("#parameter-min").val().replace(
          /\s|(null)/, "");
        var currentMax = $content.find("#parameter-max").val().replace(
          /\s|(null)/, "");
        if (block.params[parameterIndex].displayName !==
          currentName) {
          block.setParameterDisplayName(parameterIndex,
            currentName);
        }
        if (block.params[parameterIndex].direction !==
          currentDirection) {
          block.setParameterDirection(parameterIndex,
            currentDirection);
        }
        if (block.params[parameterIndex].dataType !==
          currentDataType) {
          block.setParameterDataType(parameterIndex,
            currentDataType);
        }
        if (block.params[parameterIndex].defaultValue !==
          currentDefaultValue) {
          block.setParameterDefaultValue(parameterIndex,
            currentDefaultValue.substring(0, 1).toUpperCase() +
            currentDefaultValue.substring(1).toLowerCase());
        }
        if (block.params[parameterIndex].configuration !==
          currentConfiguration) {
          block.setParameterConfiguration(parameterIndex,
            currentConfiguration);
        }
        if (block.params[parameterIndex].minValue !==
          currentMin) {
          block.setParameterMinValue(parameterIndex, currentMin);
        }
        if (block.params[parameterIndex].maxValue !==
          currentMax) {
          block.setParameterMaxValue(parameterIndex, currentMax);
        }
      }
    }
  });
  showConfiguration(block.params[parameterIndex].direction, block.params[
    parameterIndex].dataType, block.params[parameterIndex].configuration);

  function showConfiguration(currentDirection, currentDataType,
    currentConfig) {
    var showConfig = currentDirection === "Input" && currentDataType ===
      "Single";
    $('#parameter-default-value').attr('required', currentDataType !==
      "String");
    $('#parameter-configuration').css('display', (showConfig) ?
      "block" : "none");
    if (showConfig && currentConfig === 'SliderHorizontal.custom' ||
      currentConfig === 'SliderVertical.custom') {
      $('#parameter-range').css('display', 'block');
      $('#parameter-min').val('-100');
      $('#parameter-max').val('100');
    } else {
      $('#parameter-range').css('display', 'none');
      $('#parameter-min').val('null');
      $('#parameter-max').val('null');
    }
  }
}

function editParameterIcon(block, blockIndex, parameterIndex) {
  var selectedSrc = $(this).attr('src').replace('assets/import/');
  var selected = parameterIcons.indexOf(selectedSrc);
  var initial = selected;
  var $div = $('<div></div>')
    .addClass('dialog')
  for (var i = 0; i < parameterIcons.length; i++) {
    $div.append(
      $('<img></img>')
      .attr('id', i)
      .addClass((i === selected) ? 'selected' : '')
      .addClass('rigid')
      .attr('data-size', 'sm')
      .attr('src', 'assets/import/' + parameterIcons[i])
      .click(function() {
        $('.dialog').find('#' + selected).removeClass('selected');
        selected = parseInt($(this).attr('id'));
        $(this).addClass('selected');
      })
      .on('dragstart', function(e) {
        e.preventDefault();
      })
    );
  }
  vex.open({
    message: $div,
    afterClose: function($content, result) {
      if (result.value) {
        if (initial != selected) {
          projects[currentProjectIndex].blocks[blockIndex].setParameterIdentification(
            parameterIndex, parameterIcons[selected]);
        }
      }
    }
  });
}

function showWarningInVexDialog(warning) {
  if (warning) {
    $('#text-warning').html(warning);
    $('#text-warning').css('display', 'block');
    $('.vex-dialog-buttons').find('button[type=submit]').attr(
      'disabled', true);
    $(this).addClass('warning');
  } else {
    $('#text-warning').css('display', 'none');
    $('.vex-dialog-buttons').find('button[type=submit]').attr(
      'disabled', false);
    $(this).removeClass('warning');
  }
}

function deselectBlocks() {
  if (!selection.blocks) return;
  selection.blocks.forEach(block => $(block).removeClass('selected'));
  selection.blocks = [];
}

function pan(dx, dy) {
  $('.my-block').each(function(i, element, array) {
    $(element).css('left', parseInt($(element).css('left')) + dx);
    $(element).css('top', parseInt($(element).css('top')) + dy);
  });
  jsPlumb.repaintEverything();
}

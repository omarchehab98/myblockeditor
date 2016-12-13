(function() {
	///////////////
	// LIBRARIES //
	const Namespace = jsxml.Namespace;
	const QName = jsxml.QName;
	const XML = jsxml.XML;
	const XMLList = jsxml.XMLList;
	vex.defaultOptions.className = 'vex-theme-plain';
	// LIBRARIES //
	///////////////
	// VARIABLES //
	const blockIcons = [
		"/assets/PolyGroup_000_MyBlockRed_Diagram.png",
		"/assets/PolyGroup_001_Myblock_Diagram.png",
		"/assets/PolyGroup_020_MediumMotor_Diagram.png",
		"/assets/PolyGroup_021_Motor_Diagram.png",
		"/assets/PolyGroup_022_Motors2_Diagram.png",
		"/assets/PolyGroup_023_Move_Diagram.png",
		"/assets/PolyGroup_024_MoveTank_Diagram.png",
		"/assets/PolyGroup_030_Display_Diagram.png",
		"/assets/PolyGroup_031_Sound_Diagram.png",
		"/assets/PolyGroup_032_LED_Diagram.png",
		"/assets/PolyGroup_040_Wait_Diagram.png",
		"/assets/Polygroup_041_Interrupt_Diagram.png",
		"/assets/PolyGroup_050_BrickButton_Diagram.png",
		"/assets/PolyGroup_051_ColorSensor_Diagram.png",
		"/assets/PolyGroup_052_Gyro_Diagram.png",
		"/assets/PolyGroup_053_InfraredSensor_Diagram.png",
		"/assets/PolyGroup_054_RotationSensor_Diagram.png",
		"/assets/PolyGroup_055_TemperatureSensor_Diagram.png",
		"/assets/PolyGroup_056_Timer_Diagram.png",
		"/assets/PolyGroup_057_TouchSensor_Diagram.png",
		"/assets/PolyGroup_058_UltrasonicSensor_Diagram.png",
		"/assets/PolyGroup_059_EnergyMeter_Diagram.png",
		"/assets/PolyGroup_060_SoundSensor_Diagram.png",
		"/assets/PolyGroup_070_Variable_Diagram.png",
		"/assets/PolyGroup_071_Constant_Diagram.png",
		"/assets/PolyGroup_072_ArrayOperations_Diagram.png",
		"/assets/PolyGroup_073_BooleanOperations_Diagram.png",
		"/assets/PolyGroup_074_Math_Diagram.png",
		"/assets/PolyGroup_075_Round_Diagram.png",
		"/assets/PolyGroup_076_Compare_Diagram.png",
		"/assets/PolyGroup_077_Range_Diagram.png",
		"/assets/PolyGroup_078_Text_Diagram.png",
		"/assets/PolyGroup_079_Random_Diagram.png",
		"/assets/PolyGroup_090_FileAccess_Diagram.png",
		"/assets/PolyGroup_091_Datalogging_Diagram.png",
		"/assets/PolyGroup_092_Messaging_Diagram.png",
		"/assets/PolyGroup_093_BlueTooth_Diagram.png",
		"/assets/PolyGroup_094_Bluetooth_Diagram.png",
		"/assets/PolyGroup_095_KeepAlive_Diagram.png",
		"/assets/PolyGroup_096_RawSensorValue_Diagram.png",
		"/assets/PolyGroup_097_InvertMotor_Diagram.png",
	];
	const parameterIcons = [
		"/assets/Identification_000_A.png",
		"/assets/Identification_001_B.png",
		"/assets/Identification_002_C.png",
		"/assets/Identification_003_D.png",
		"/assets/Identification_004_SensorPort_0.png",
		"/assets/Identification_005_SensorPort_1.png",
		"/assets/Identification_006_SensorPort_2.png",
		"/assets/Identification_007_SensorPort_3.png",
		"/assets/Identification_008_Numeric.png",
		"/assets/Identification_009_OutputBoolean.png",
		"/assets/Identification_0010_Text.png",
		"/assets/Identification_012_Color_Black.png",
		"/assets/Identification_013_Color_White.png",
		"/assets/Identification_014_Color_Red.png",
		"/assets/Identification_015_Color_Green.png",
		"/assets/Identification_016_Color_Blue.png",
		"/assets/Identification_017_Color_Yellow.png",
		"/assets/Identification_018_Color_Brown.png",
		"/assets/Identification_019_Color_NoColor.png",
		"/assets/Identification_020_x.png",
		"/assets/Identification_021_y.png",
		"/assets/Identification_022_x1.png",
		"/assets/Identification_023_y1.png",
		"/assets/Identification_024_x2.png",
		"/assets/Identification_025_y2.png",
		"/assets/Identification_026_xColumn.png",
		"/assets/Identification_027_yRow.png",
		"/assets/Identification_028_Width.png",
		"/assets/Identification_029_Height.png",
		"/assets/Identification_030_ComparisonType_Equal.png",
		"/assets/Identification_031_ComparisonType_GreaterEqual.png",
		"/assets/Identification_032_ComparisonType_GreaterThan.png",
		"/assets/Identification_033_ComparisonType_LessEqual.png",
		"/assets/Identification_034_ComparisonType_LessThan.png",
		"/assets/Identification_035_ComparisonType_NotEqual.png",
		"/assets/Identification_036_Exponent.png",
		"/assets/Identification_037_NumberOfDecimals.png",
		"/assets/Identification_040_Index.png",
		"/assets/Identification_041_ArrayOutNumeric.png",
		"/assets/Identification_041_Length.png",
		"/assets/Identification_042_ArrayInNumeric.png",
		"/assets/Identification_043_ArrayInBoolean.png",
		"/assets/Identification_044_ArrayOutBoolean.png",
		"/assets/Identification_050_Celcius.png",
		"/assets/Identification_051_Fahrenheit.png",
		"/assets/Identification_052_DistanceCM.png",
		"/assets/Identification_053_DistanceInches.png",
		"/assets/Identification_054_OutputDistance.png",
		"/assets/Identification_055_Db.png",
		"/assets/Identification_056_Dba.png",
		"/assets/Identification_057_Current.png",
		"/assets/Identification_058_Hz.png",
		"/assets/Identification_059_Joule.png",
		"/assets/Identification_060_OutVolts.png",
		"/assets/Identification_061_OutWatts.png",
		"/assets/Identification_062_Rate.png",
		"/assets/Identification_070_Fill.png",
		"/assets/Identification_071_ClearScreen.png",
		"/assets/Identification_072_BlackWhite.png",
		"/assets/Identification_073_InvertColorLine_False.png",
		"/assets/Identification_074_InvertColorLine_True.png",
		"/assets/Identification_075_InvertColorRect_False.png",
		"/assets/Identification_076_InvertColorRect_True.png",
		"/assets/Identification_077_InvertColorCircle_False.png",
		"/assets/Identification_078_InvertColorCircle_True.png",
		"/assets/Identification_079_InvertColorPoint_False.png",
		"/assets/Identification_080_InvertColorPoint_True.png",
		"/assets/Identification_081_InvertColorText_False.png",
		"/assets/Identification_082_InvertColorText_True.png",
		"/assets/Identification_083_FontSize.png",
		"/assets/Identification_084_FontSize_0.png",
		"/assets/Identification_085_FontSize_1.png",
		"/assets/Identification_086_FontSize_2.png",
		"/assets/Identification_200_Speed_0.png",
		"/assets/Identification_201_Speed_Plus25.png",
		"/assets/Identification_202_Speed_Plus50.png",
		"/assets/Identification_203_Speed_Plus75.png",
		"/assets/Identification_204_Speed_Plus100.png",
		"/assets/Identification_205_Speed_Minus25.png",
		"/assets/Identification_206_Speed_Minus50.png",
		"/assets/Identification_207_Speed_Minus75.png",
		"/assets/Identification_208_Speed_Minus100.png",
		"/assets/Identification_209_CurrentPower.png",
		"/assets/Identification_220_Steering_Straight_Forward.png",
		"/assets/Identification_221_Steering_Left_Medium_Forward.png",
		"/assets/Identification_222_Steering_Left_Full_Forward.png",
		"/assets/Identification_223_Steering_Right_Medium_Forward.png",
		"/assets/Identification_224_Steering_Right_Full_Forward.png",
		"/assets/Identification_225_Steering_Straight_Backward.png",
		"/assets/Identification_226_Steering_Left_Medium_Backward.png",
		"/assets/Identification_227_Steering_Left_Full_Backward.png",
		"/assets/Identification_228_Steering_Right_Medium_Backward.png",
		"/assets/Identification_229_Steering_Right_Full_Backward.png",
		"/assets/Identification_240_Time.png",
		"/assets/Identification_241_TimerID_0.png",
		"/assets/Identification_242_TimerID_1.png",
		"/assets/Identification_243_TimerID_2.png",
		"/assets/Identification_244_TimerID_3.png",
		"/assets/Identification_245_TimerID_4.png",
		"/assets/Identification_246_TimerID_5.png",
		"/assets/Identification_247_TimerID_6.png",
		"/assets/Identification_248_TimerID_7.png",
		"/assets/Identification_260_Volume_0.png",
		"/assets/Identification_261_Volume_25.png",
		"/assets/Identification_262_Volume_50.png",
		"/assets/Identification_263_Volume_75.png",
		"/assets/Identification_264_Volume_100.png",
		"/assets/Identification_270_LEDColor_Red.png",
		"/assets/Identification_271_LEDColor_Green.png",
		"/assets/Identification_272_LEDColor_Orange.png",
		"/assets/Identification_278_MotorRotation.png",
		"/assets/Identification_279_OutputNumberDegrees.png",
		"/assets/Identification_280_DegreesAngle_0.png",
		"/assets/Identification_281_DegreesAngle_Plus45.png",
		"/assets/Identification_282_DegreesAngle_Plus90.png",
		"/assets/Identification_283_DegreesAngle_Plus135.png",
		"/assets/Identification_284_DegreesAngle_Plus180.png",
		"/assets/Identification_285_DegreesAngle_Plus225.png",
		"/assets/Identification_286_DegreesAngle_Plus270.png",
		"/assets/Identification_287_DegreesAngle_Plus315.png",
		"/assets/Identification_288_DegreesAngle_Plus360.png",
		"/assets/Identification_289_DegreesAngle_Minus45.png",
		"/assets/Identification_290_DegreesAngle_Minus90.png",
		"/assets/Identification_291_DegreesAngle_Minus135.png",
		"/assets/Identification_292_DegreesAngle_Minus180.png",
		"/assets/Identification_293_DegreesAngle_Minus225.png",
		"/assets/Identification_294_DegreesAngle_Minus270.png",
		"/assets/Identification_295_DegreesAngle_Minus315.png",
		"/assets/Identification_296_DegreesAngle_Minus360.png",
		"/assets/Identification_310_OutputBrickButtonID_0.png",
		"/assets/Identification_311_OutputBrickButtonID_1.png",
		"/assets/Identification_312_OutputBrickButtonID_2.png",
		"/assets/Identification_313_OutputBrickButtonID_3.png",
		"/assets/Identification_314_OutputBrickButtonID_4.png",
		"/assets/Identification_315_OutputBrickButtonID_5.png",
		"/assets/Identification_320_OutputButtonID_0.png",
		"/assets/Identification_321_OutputButtonID_1.png",
		"/assets/Identification_322_OutputButtonID_2.png",
		"/assets/Identification_323_OutputButtonID_3.png",
		"/assets/Identification_324_OutputButtonID_4.png",
		"/assets/Identification_325_OutputButtonID_5.png",
		"/assets/Identification_326_OutputButtonID_6.png",
		"/assets/Identification_327_OutputButtonID_7.png",
		"/assets/Identification_328_OutputButtonID_8.png",
		"/assets/Identification_329_OutputButtonID_9.png",
		"/assets/Identification_330_OutputButtonID_10.png",
		"/assets/Identification_331_OutputButtonID_11.png",
		"/assets/Identification_340_SetOfChannels_1.png",
		"/assets/Identification_341_SetOfChannels_2.png",
		"/assets/Identification_342_SetOfChannels_3.png",
		"/assets/Identification_343_SetOfChannels_4.png",
		"/assets/Identification_350_Touch.png",
		"/assets/Identification_351_TouchState_Pressed.png",
		"/assets/Identification_352_TouchState_Released.png",
		"/assets/Identification_353_TouchState_Bumped.png",
		"/assets/Identification_360_ConnectTo_0.png",
		"/assets/Identification_361_ConnectTo_1.png",
		"/assets/Identification_362_ConnectTo_2.png",
		"/assets/Identification_363_ConnectTo_3.png",
		"/assets/Identification_364_ConnectTo_4.png",
		"/assets/Identification_365_ConnectTo_5.png",
		"/assets/Identification_366_ConnectTo_6.png",
		"/assets/Identification_367_ConnectToText.png",
		"/assets/Identification_368_MeasuringMode_Ping.png",
		"/assets/Identification_369_MeasuringMode_Continuous.png",
		"/assets/Identification_400_Threshold_Equal_+2.png",
		"/assets/Identification_401_Threshold_Equal_+1.png",
		"/assets/Identification_402_Threshold_Equal_0.png",
		"/assets/Identification_403_Threshold_Equal_-1.png",
		"/assets/Identification_404_Threshold_Equal_-2.png",
		"/assets/Identification_405_Threshold_Greater_+2.png",
		"/assets/Identification_406_Threshold_Greater_+1.png",
		"/assets/Identification_407_Threshold_Greater_0.png",
		"/assets/Identification_408_Threshold_Greater_-1.png",
		"/assets/Identification_409_Threshold_Greater_-2.png",
		"/assets/Identification_410_Threshold_Less_+2.png",
		"/assets/Identification_411_Threshold_Less_+1.png",
		"/assets/Identification_412_Threshold_Less_0.png",
		"/assets/Identification_413_Threshold_Less_-1.png",
		"/assets/Identification_414_Threshold_Less_-2.png",
		"/assets/Identification_415_Threshold_NotEqual_+2.png",
		"/assets/Identification_416_Threshold_NotEqual_+1.png",
		"/assets/Identification_417_Threshold_NotEqual_0.png",
		"/assets/Identification_418_Threshold_NotEqual_-1.png",
		"/assets/Identification_419_Threshold_NotEqual_-2.png",
		"/assets/Identification_498_RandomValue.png",
		"/assets/Identification_499_Test.png",
		"/assets/Identification_500_angle.png",
		"/assets/Identification_501_MeasuredColor.png",
		"/assets/Identification_502_MeasuredLight.png",
		"/assets/Identification_503_NumberRotations.png",
		"/assets/Identification_504_Radius.png",
		"/assets/Identification_505_Until.png",
		"/assets/Identification_506_Invert_0.png",
		"/assets/Identification_507_Invert_1.png",
		"/assets/Identification_508_BrakeAtEnd_Brake.png",
		"/assets/Identification_509_BrakeAtEnd_Coast.png",
		"/assets/Identification_510_PlayType_PlayOnce.png",
		"/assets/Identification_511_PlayType_Repeat.png",
		"/assets/Identification_512_PlayType_WaitForCompletion.png",
		"/assets/Identification_513_OutputHeading.png",
		"/assets/Identification_514_OutputCompare.png",
		"/assets/Identification_515_Port.png",
		"/assets/Identification_516_Pulse.png",
		"/assets/Identification_520_UpperBound.png",
		"/assets/Identification_521_LowerBound.png",
		"/assets/Identification_525_Note.png",
		"/assets/Identification_526_ConstantValue.png",
		"/assets/Identification_527_Value.png",
		"/assets/Identification_528_FileName.png",
		"/assets/Identification_529_Message.png",
		"/assets/Identification_530_MessageTitle.png",
		"/assets/Identification_531_ReceivingBrickName.png",
		"/assets/identification_532_StringA.png",
		"/assets/Identification_533_StringB.png",
		"/assets/Identification_534_StringC.png",
		"/assets/Identification_535_UltrasoundDetected.png",
		"/assets/Identification_536_WaitForChange_Both.png",
		"/assets/Identification_537_WaitForChange_Down.png",
		"/assets/Identification_538_WaitForChange_Up.png",
	];
	const $body = $('body');
	const $projects = $('.header .projects');
	const $project = $('.project');
	const $workspace = $project.find('.workspace');
	const $selection = $project.find('.selection');
	const $fileUpload = $('.file-upload');
	const $fileUploadClose = $fileUpload.find('#close');
	const $fileUploadErrors = $fileUpload.find('.center').find('#errors');
	// Project
	var projects = [];
	var currentProjectIndex = -1;
	// Controls
	var blockBeingDragged = null;
	var panning = {};
	var isPanning = false;
	var selection = {};
	var isSelecting = false;
	var timeContextMenu = null;
	// VARIABLES //
	///////////////
	// CONTROLS //
	$body.on("dragover", function(e) {
		e = e || event;
		e.preventDefault();
	});
	$body.on("drop", function(e) {
		e = e || event;
		e.preventDefault();
		const file = e.originalEvent.dataTransfer.files[0];
		handleFile(file);
	});
	$fileUpload.find('#close').click(function() {
		$fileUpload.css('display', 'none');
		$fileUploadClose.css('display', 'none');
		$fileUploadErrors.html('');
	});
	$project.on('mousedown', function(e) {
		switch (e.which) {
			case 1:
				if (!blockBeingDragged) {
					isSelecting = true;
					selection = {
						x: e.pageX,
						y: e.pageY
					};
					$selection.css('display', 'block');
					$selection.css('top', selection.y);
					$selection.css('right', window.innerWidth - selection.x);
					$selection.css('bottom', window.innerHeight - selection.y);
					$selection.css('left', selection.x);
				}
				break;
			case 2:
				isPanning = true;
				panning = {
					x: e.pageX,
					y: e.pageY
				};
				$('#data-wires').css('display', 'none');
				break;
		}
	});
	$project.on('mousemove', function(e) {
		switch (e.which) {
			case 1:
				if (blockBeingDragged) {
					blockBeingDragged.css('left', e.pageX - blockBeingDraggedOffset.left);
					blockBeingDragged.css('top', e.pageY - blockBeingDraggedOffset.top);
				} else if (isSelecting) {
					$selection.css('top', Math.min(selection.y, e.pageY));
					$selection.css('right', window.innerWidth - (Math.max(selection.x, e.pageX)));
					$selection.css('bottom', window.innerHeight - (Math.max(selection.y, e.pageY)));
					$selection.css('left', Math.min(selection.x, e.pageX));
				}
				break;
			case 2:
				if (isPanning) {
					const dx = (e.pageX - panning.x);
					const dy = (e.pageY - panning.y);
					$('.my-block').each(function(i, element, array) {
						$(element).css('left', parseInt($(element).css('left'))+dx);
						$(element).css('top', parseInt($(element).css('top'))+dy);
					});
					panning = {
						x: e.pageX,
						y: e.pageY
					};
				}
				break;
		}
	});
	$project.on('mouseup', function(e) {
		if (timeContextMenu + 300 <= Date.now()) {
			$('.contextmenu').blur();
			timeContextMenu = null;
		}
		switch (e.which) {
			case 1:
				if (selection && currentProjectIndex >= 0) {
					selection.blocks = [];
					selection.width = parseInt($selection.css('width'));
					selection.height = parseInt($selection.css('height'));
					for (var i = 0; i < projects[currentProjectIndex].blocks.length; i++) {
						const block = projects[currentProjectIndex].blocks[i].dom;
						const x = parseInt(block.css('left'));
						const y = parseInt(block.css('top'));
						const width = parseInt(block.css('width'));
						const height = parseInt(block.css('height'));
						if (rectanglesIntersect({x:x,y:y,width:width,height:height}, selection)) {
							selection.blocks.push(block);
							block.addClass("selected");
						}
					}
				}
				$selection.css('display', 'none');
				$selection.css('top', '');
				$selection.css('right', '');
				$selection.css('bottom', '');
				$selection.css('left', '');
				isSelecting = false;
				if (blockBeingDragged) {
					blockBeingDragged = null;
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
	$project.on('mouseleave', function(e) {
		switch (e.which) {
			case 1:
				$project.trigger('mouseup');
				break;
		}
	});
	$project.on ('mousewheel', function (e) {
	    var dx = -e.originalEvent.deltaX;
	    var dy = e.originalEvent.deltaY;
		$('.my-block').each(function(i, element, array) {
			$(element).css('left', parseInt($(element).css('left'))+dx);
			$(element).css('top', parseInt($(element).css('top'))+dy);
		});
		jsPlumb.repaintEverything();
	});
	// CONTROLS //
	/////////////////
	// HEADER MENU //
	$('#open').click(function() {

		$('#open-hidden').trigger('click');
	});
	$('#open-hidden').change(function(e) {
		if (!$(this).val()) {
			return;
		}
		const file = e.target.files[0];
		handleFile(file);
		$(this).val('');
	})
	$('#save').click(function() {
		
		var changes = [];
		for (var i = 0; i < projects[currentProjectIndex].undo.length; i++) {
			const blockIndex = projects[currentProjectIndex].undo[i].blockIndex + "";
			const originalName = projects[currentProjectIndex].blocks[blockIndex].originalName + ".ev3p.mbxml";
			const parameterIndex = projects[currentProjectIndex].undo[i].parameterIndex + "";
			const action = projects[currentProjectIndex].undo[i].fn + "";
			const value = projects[currentProjectIndex].undo[i].to + "";
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
				changes[blockIndex].parameters[parameterIndex].fn[action] = value;
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

		function computeName(blockIndex, parameterIndex, direction, dataType) {
			var name = direction+" "+computeAestheticDataType(dataType);
			var count = 0;
			var taken;
			do {
				taken = false;
				const currentName = name + ((count)?count:"");
				for (var n = 0; n < projects[currentProjectIndex].blocks[blockIndex].params.length; n++) {
					if (parameterIndex === n) {
						continue;
					}
					if (projects[currentProjectIndex].blocks[blockIndex].params[n].name === currentName) {
						taken = true;
						break;
					}
				}
				if (taken) {
					count++;
				}
			} while (taken);
			name = name + ((count)?count:"");
			projects[currentProjectIndex].blocks[blockIndex].params[parameterIndex].name = name;
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

		const zip = projects[currentProjectIndex].zip;
		var refactored = [];
		const numberOfFiles = objectLength(zip.files);
		var currentFile = 0;
		zip.forEach(function(relativePath, zipEntry) {
			zip.file(zipEntry.name).async("string").then(function(result) {
				var fileName = zipEntry.name;
				console.log(fileName+":");
				if (zipEntry.name.endsWith("ev3p") || zipEntry.name.endsWith("mbxml") || zipEntry.name.endsWith("lvprojx")) {
					var xml = new XML(result);
					const extension = zipEntry.name.substring(zipEntry.name.lastIndexOf(".")+1);
					switch (extension) {
						/////////////
						// LVPROJX //
						case "lvprojx":
						xml.children().each(function(item, index) {
							if (item.attribute('Name').toString() === "Default") {
								const target = item.child("Project").child("Target");
								target.children().each(function (block, index) {
									if (block.localName() === "ProjectReference") {
										return;
									}
									var change = getChange(block.attribute("Name").toString().replace(/\\/g, "").replace(/(\.ev3p$)/g, ".ev3p.mbxml"));
									if (change && change.fn && change.fn.setName) {
										switch (block.localName()) {
											case "SourceFileReference":
											if (change.originalName === block.attribute("Name").toString().replace(/\\/g, "")+".mbxml") {
												// attr Name "{block}\.ev3p"
												block.attribute("Name").setValue(change.fn.setName+"\\.ev3p");
												// attr StoragePath = // "{block}.ev3p"
												block.attribute("StoragePath").setValue(change.fn.setName+".ev3p");
												// attr RelativeStoragePath = // "{block}.ev3p"
												block.attribute("RelativeStoragePath").setValue(change.fn.setName+".ev3p");
											}
											break;
											case "DefinitionReference":
											// attr Name "{block}\.ev3p\.mbxml"
											block.attribute("Name").setValue(change.fn.setName+"\\.ev3p\\.mbxml");
											break;
										}
									}
								});
							} else {
								var change = getChange(item.attribute('Name').toString().replace(/\\/g, ""));
								if (change && change.fn && change.fn.setName && change.originalName === item.attribute('Name').toString().replace(/\\/g, '')) {
									// attr Name "{block}\.ev3p\.mbxml"
									item.attribute('Name').setValue(change.fn.setName+"\\.ev3p\\.mbxml");
									// child ExternalFile child RelativeStoragePath text "{block}.ev3p.mbxml"
									item.child('ExternalFile').child('RelativeStoragePath')._children[0]._text = change.fn.setName+".ev3p.mbxml";
								}
							}
						});
						break;
						// LVPROJX //
						/////////////
						// EV3P //
						case "ev3p":
						var change = getChange(zipEntry.name+".mbxml");
						const virtualInstrument = xml.child("Namespace").child("VirtualInstrument");
						if (change) {
							if (change.fn && change.fn.setName) {
								// fileName {block}.ev3p
								fileName = change.fn.setName+".ev3p";
							}
							if (change.parameters) {
								virtualInstrument.children().each(function(item, i) {
									if (item.localName() === "DataItem" && !item.attribute("Name").toString().match(/(SequenceIn)|(SequenceOut)/g)) {
										if (change.parameters[i] && change.parameters[i].fn) {
											// attr Id {parameter-directionon}\ Number|Logic|Text|Numeric\ Array|Logic\Array
											if (change.parameters[i].fn.setParameterDirection || change.parameters[i].fn.setParameterDataType) {
												const blockIndex = change.blockIndex;
												const direction = change.parameters[i].fn.setParameterDirection || item.attribute("CallDirection").toString();
												const dataType = change.parameters[i].fn.setParameterDataType || item.attribute("DataType").toString();
												var name = computeName(blockIndex, i, direction, dataType);
												item.attribute("Name").setValue(name.replace(/ /g, "\\ "));
												// attr DataType {dataType}
												if (change.parameters[i].fn.setParameterDataType) {
													item.attribute("DataType").setValue(change.parameters[i].fn.setParameterDataType);
												}
												if (change.parameters[i].fn.setParameterDefaultValue) {
													item.attribute("DefaultValue").setValue(change.parameters[i].fn.setParameterDefaultValue);
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
							const blockDiagram = virtualInstrument.child("BlockDiagram");
							var parameterIndex = -1;
							blockDiagram.children().each(function (block) {
								switch (block.localName()) {
									
									case "ConfigurableMegaAccessor":
									if (change.parameters) {
										const type = block.attribute("AccessorType").toString();
										block.children().each(function(parameter) {
											parameterIndex++;
											if (change.parameters[parameterIndex] && change.parameters[parameterIndex].fn) {
												if (type === "Output") {
													if (change.parameters[parameterIndex].fn.setParameterDefaultValue) {
														parameter.attribute("ConfiguredValue").setValue(change.parameters[parameterIndex].fn.setParameterDefaultValue);
													}
												}
												const terminal = parameter.child("Terminal");
												if (change.parameters[parameterIndex].fn.setParameterDirection || change.parameters[parameterIndex].fn.setParameterDataType) {
													const blockIndex = change.blockIndex;
													const direction = change.parameters[parameterIndex].fn.setParameterDirection || type;
													const dataType = change.parameters[parameterIndex].fn.setParameterDataType || terminal.attribute("DataType").toString();
													var name = computeName(blockIndex, parameterIndex, direction, dataType);

													terminal.attribute("Id").setValue(name.replace(/ /g, "\\ "));
												}
												// terminal.attribute("Direction").setValue();
												if (change.parameters[parameterIndex].fn.setParameterDataType) {
													terminal.attribute("DataType").setValue(change.parameters[parameterIndex].fn.setParameterDataType);
												}
												// terminal.attribute("Bounds").setValue();
											}
										});
									}
									break;
								}
							});
						} else {

							const blockDiagram = virtualInstrument.child("BlockDiagram");
							var parameterIndex = -1;
							blockDiagram.children().each(function (block) {
								switch (block.localName()) {

									case "ConfigurableMethodCall":
									var target = getChange(block.attribute("Target").toString().replace(/\\/g, "")+".mbxml");
									if (target) {
										if (target.fn && target.fn.setName) {
											// attr Target {block}\.ev3p
											block.attribute("Target").setValue(target.fn.setName+"\\.ev3p");
										}
										if (target.parameters) {
											block.children().each(function (parameter, i) {
												if (i === 0 || parameter.localName() !== "ConfigurableMethodTerminal") {
													return;
												}
												i--;
												if (target.parameters[i] && target.parameters[i].fn) {
													const terminal = parameter.child("Terminal");
													const direction = target.parameters[i].fn.setParameterDirection || terminal.attribute("Direction").toString();
													// Terminal attr Id {direction}\ Number|Logic|Text|Numeric\ Array|Logic\Array
													if (target.parameters[i].fn.setParameterDirection || target.parameters[i].fn.setParameterDataType) {
														const blockIndex = target.blockIndex;
														const dataType = target.parameters[i].fn.setParameterDataType || terminal.attribute("DataType").toString();
														var name = computeName(blockIndex, i, direction, dataType);
														terminal.attribute("Id").setValue(name.replace(/ /g, "\\ "));
													}
													// attr ConfiguredValue {defaultValue}
													if(target.parameters[i].fn.setParameterDefaultValue && direction === "Input") {
														parameter.attribute("ConfiguredValue").setValue(target.parameters[i].fn.setParameterDefaultValue);
													}
													// Terminal attr Direction
													// if (target.parameters[i].fn.setParameterDirection) {
													// 	parameter.child("Terminal").attribute("Direction").setValue(target.parameters[i].fn.setParameterDirection);
													// }
													// Terminal attr DataType
													if (target.parameters[i].fn.setParameterDataType) {
														terminal.attribute("DataType").setValue(target.parameters[i].fn.setParameterDataType);
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
						// EV3P //
						///////////
						// MBXML //
						case "mbxml":
						try {
						var change = getChange(zipEntry.name);
						if (change) {
							const polyGroup = xml.child("PolyGroups").child("PolyGroup");
							if (change.fn) {
								if (change.fn.setName) {
									// fileName {block}.ev3p.mbxml
									fileName = change.fn.setName+".ev3p.mbxml";
								}
								if (change.fn.setIconBaseName) {
									// attr IconBaseName {icon} eg: PolyGroup_000_MyBlockRed
									polyGroup.attribute("IconBaseName").setValue(change.fn.setIconBaseName.replace(/((\/assets\/)|(_Diagram\.png))/g, ""));
								}
							}
							if (change.parameters) {
								const block = polyGroup.child("Block");
								var parameterIndex = -1;
								block.children().each(function(parameter) {
									if (parameter.localName() === "ParamInfo") {
										parameterIndex++;
										if (change.parameters[parameterIndex]) {
												

											const direction = change.parameters[parameterIndex].fn.setParameterDirection || parameter.attribute("Direction").toString();
											if (change.parameters[parameterIndex].fn.setParameterDirection || change.parameters[parameterIndex].fn.setParameterDataType) {
												const blockIndex = change.blockIndex;
												const dataType = change.parameters[parameterIndex].fn.setParameterDataType || parameter.attribute("DataType").toString();
												var name = computeName(blockIndex, parameterIndex, direction, dataType);
												// attr Name {name} || {direction} {dataType}
												parameter.attribute("Name").setValue(name);
											}


											if (change.parameters[parameterIndex].fn.setParameterDisplayName) {
												// attr DisplayName {name} || ""
												parameter.attribute("DisplayName").setValue(change.parameters[parameterIndex].fn.setParameterDisplayName);
											}
											if (change.parameters[parameterIndex].fn.setParameterIdentification) {
												// attr Identification {identification} eg: Identification_000_A.png
												parameter.attribute("Identification").setValue(change.parameters[parameterIndex].fn.setParameterIdentification.replace(/\/assets\//g, ""));
											}
											if (change.parameters[parameterIndex].fn.setParameterDataType) {
												// attr DataType {dataType}
												parameter.attribute("DataType").setValue(change.parameters[parameterIndex].fn.setParameterDataType);
											}
											if (change.parameters[parameterIndex].fn.setParameterDefaultValue && direction === "Input") {
												// attr DefaultValue {defaultValue}
												parameter.attribute("DefaultValue").setValue(change.parameters[parameterIndex].fn.setParameterDefaultValue);
											}
											if (change.parameters[parameterIndex].fn.setParameterConfiguration) {
												// attr Configuration {configuration} || delete
												if (parameter.attribute("Configuration").length()) {
													parameter.attribute("Configuration").setValue(change.parameters[parameterIndex].fn.setParameterConfiguration);
												} else {
													parameter.addAttribute({
														name: "Configuration",
														value: change.parameters[parameterIndex].fn.setParameterConfiguration,
													});
												}
											} else if (parameter.attribute("Configuration").length()) {
												parameter.removeAttribute("Configuration");
											}
											if (change.parameters[parameterIndex].fn.setParameterMinValue) {
												// attr MinValue {minValue} || delete
												if (parameter.attribute("MinValue").length()) {
													parameter.attribute("MinValue").setValue(change.parameters[parameterIndex].fn.setParameterMinValue);
												} else {
													parameter.addAttribute({
														name: "MinValue",
														value: change.parameters[parameterIndex].fn.setParameterMinValue,
													});
												}
											} else if (parameter.attribute("MinValue").length()) {
												parameter.removeAttribute("MinValue");
											}
											if (change.parameters[parameterIndex].fn.setParameterMaxValue) {
												// attr MaxValue {minValue} || delete
												if (parameter.attribute("MaxValue").length()) {
													parameter.attribute("MaxValue").setValue(change.parameters[parameterIndex].fn.setParameterMaxValue);
												} else {
													parameter.addAttribute({
														name: "MaxValue",
														value: change.parameters[parameterIndex].fn.setParameterMaxValue,
													});
												}
											} else if (parameter.attribute("MaxValue").length()) {
												parameter.removeAttribute("MaxValue");
											}
										}
									}
								});
							}
						}
					}catch(e){console.log(e)}
						break;
						// MBXML //
						///////////
					}
					refactored.push({
						name: fileName,
						content: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n"+xml.toString()
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
					var refactoredZip = new JSZip();
					for (var i = 0; i < refactored.length; i++) {
						refactoredZip.file(refactored[i].name, refactored[i].content);
					}
					refactoredZip.generateAsync({type:"blob"}).then(function(content) {
						saveAs(content, projects[currentProjectIndex].name+"-Save.ev3");
					});
				}
			});
		});
	});
	$('#undo').click(function() {
		if (!projects[currentProjectIndex].undo.length) {
			return;
		}
		const action = projects[currentProjectIndex].undo[projects[currentProjectIndex].undo.length - 1];
		projects[currentProjectIndex].redo.push(projects[currentProjectIndex].undo.pop());
		switch (action.fn) {
			case "setName":
				projects[currentProjectIndex].blocks[action.blockIndex].setName(action.from, true);
				break;
			case "setDescription":
				projects[currentProjectIndex].blocks[action.blockIndex].setDescription(action.from, true);
				break;
			case "setIconBaseName":
				projects[currentProjectIndex].blocks[action.blockIndex].setIconBaseName(action.from, true);
				break;
			case "setParameterName":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterName(action.parameterIndex, action.from, true);
				break;
			case "setParameterDisplayName":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterDisplayName(action.parameterIndex, action.from, true);
				break;
			case "setParameterDirection":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterDirection(action.parameterIndex, action.from, true);
				break;
			case "setParameterIdentification":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterIdentification(action.parameterIndex, action.from, true);
				break;
			case "setParameterDataType":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterDataType(action.parameterIndex, action.from, true);
				break;
			case "setParameterDefaultValue":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterDefaultValue(action.parameterIndex, action.from, true);
				break;
			case "setParameterConfiguration":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterConfiguration(action.parameterIndex, action.from, true);
				break;
			case "setParameterMinValue":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterMinValue(action.parameterIndex, action.from, true);
				break;
			case "setParameterMaxValue":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterMaxValue(action.parameterIndex, action.from, true);
				break;
			default:
				console.error(action.fn);
		}
	});
	$('#redo').click(function() {
		if (!projects[currentProjectIndex].redo.length) {
			return;
		}
		const action = projects[currentProjectIndex].redo[projects[currentProjectIndex].redo.length - 1];
		projects[currentProjectIndex].undo.push(projects[currentProjectIndex].redo.pop());
		switch (action.fn) {
			case "setName":
				projects[currentProjectIndex].blocks[action.blockIndex].setName(action.to, true);
				break;
			case "setDescription":
				projects[currentProjectIndex].blocks[action.blockIndex].setDescription(action.to, true);
				break;
			case "setIconBaseName":
				projects[currentProjectIndex].blocks[action.blockIndex].setIconBaseName(action.to, true);
				break;
			case "setParameterName":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterName(action.parameterIndex, action.to, true);
				break;
			case "setParameterDisplayName":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterDisplayName(action.parameterIndex, action.to, true);
				break;
			case "setParameterDirection":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterDirection(action.parameterIndex, action.to, true);
				break;
			case "setParameterIdentification":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterIdentification(action.parameterIndex, action.to, true);
				break;
			case "setParameterDataType":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterDataType(action.parameterIndex, action.to, true);
				break;
			case "setParameterDefaultValue":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterDefaultValue(action.parameterIndex, action.to, true);
				break;
			case "setParameterConfiguration":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterConfiguration(action.parameterIndex, action.to, true);
				break;
			case "setParameterMinValue":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterMinValue(action.parameterIndex, action.to, true);
				break;
			case "setParameterMaxValue":
				projects[currentProjectIndex].blocks[action.blockIndex].setParameterMaxValue(action.parameterIndex, action.to, true);
				break;
			default:
				console.error(action.fn);
		}
	});
	// HEADER MENU //
	//////////////////
	// CONTEXT MENU //
	$('body').contextmenu(function(e) {
		if (timeContextMenu) {
			return false;
		}
		if (vex.getAllVexes().length > 0) {
			return false;
		}
		$('.contextmenu').css('display', 'block');
		$('.contextmenu').css('top', e.pageY+30);
		$('.contextmenu').css('left', e.pageX+30);
		$('.contextmenu').css('width', '150px');
		$('.contextmenu').css('opacity', '0');
		$('.contextmenu').stop();
		timeContextMenu = Date.now();
        $('.contextmenu').animate({
        	top: e.pageY+"px",
            left: e.pageX+"px",
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
		g.setDefaultEdgeLabel(function() { return {}; });
		for (var i = 0; i < nodes.length; i++) {
			var n = nodes[i];
			g.setNode(n.id, {width: parseInt($(n).css('width')), height: parseInt($(n).css('height'))});
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
			$("#"+v).css("left", g.node(v).x+"px");
			$("#"+v).css("top", (g.node(v).y+(window.innerHeight/3))+"px");
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
		const doneTypingInterval = 100;
		var $div = $('<div></div>')
			.addClass('dialog')
			.append('<p style="text-align: left;"><i class="fa fa-search fa-lg"></i> Search</p>')
			.append(
				$('<input/>')
				.attr('id', 'search-input')
				.attr('type', 'text')
				.attr('placeholder', 'Search for My Block name')
				.on('keydown', function () {
					if (typingTimer) {
						clearTimeout(typingTimer);
					}
				})
				.on('keyup', function () {
					clearTimeout(typingTimer);
					typingTimer = setTimeout(doneTyping, doneTypingInterval);
				})
				);
		function doneTyping() {
			const search = $div.find('#search-input').val();
			var targetX = null;
			var targetY = null;
			for (var i = 0; i < projects[currentProjectIndex].blocks.length; i++) {
				const regex = new RegExp(search, 'i');
				if (projects[currentProjectIndex].blocks[i].name.match(regex)) {
					targetX = parseInt(projects[currentProjectIndex].blocks[i].dom.css('left'));
					targetY = parseInt(projects[currentProjectIndex].blocks[i].dom.css('top'));
					break;
				}
			}
			if (targetX && targetY) {
				const x = window.innerWidth / 2;
				const y = window.innerHeight / 2;
				const dx = x - targetX;
				const dy = y - targetY;
				$('#data-wires').css('display', 'none');
				$('.my-block').animate({
					left: "+="+dx+"px",
					top: "+="+dy+"px",
				}, 500, function() {
					$('#data-wires').css('display', 'block');
					jsPlumb.repaintEverything();
				});
			}
		}
		vex.dialog.open({
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
	// CONTEXT MENU //
	///////////////////
	// FILE HANDLING //
	function handleFile(file) {
		if (!file) {
			return;
		}
		$fileUpload.css('display', 'block');
		$fileUploadClose.css('display', 'none');
		$fileUploadErrors.html('');
		var errors = [];
		if (file.size > 625000) {
			distinctPush(errors, "Files size cannot exceed 5Mb.");
		}
		let nameLength = file.name.length;
		let indexOfDot = file.name.lastIndexOf(".");
		let extension = file.name.substring(indexOfDot+1);
		if (indexOfDot == -1 || indexOfDot == nameLength - 1 || ["ev3"].indexOf(extension) === -1) {
			distinctPush(errors, "Files can only be of type \"ev3\".");
		}
		if (errors.length) {
			showWarningInFileUpload(errors);
		} else {
			let indexOfDot = file.name.lastIndexOf(".");
			let extension = file.name.substring(indexOfDot+1);
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
					$projects.children().each(function() {$(this).removeClass("selected");});
					$projects.append(
						$('<li></li>')
						.addClass("selected")
						.append(
							$('<span></span>')
							.html(projects[projects.length - 1].name)
							)
						.append(
							$('<i class="fa fa-close"></i>')
							.click(function() {
								const index = $(this).parent().index();
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
									const index = $(this).index();
									console.log(index);
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
		JSZip.loadAsync(file)
			.then(function(zip) {
				currentProjectIndex = projectIndex;
				selectedBlock = -1;
				selectedParameter = -1;
				projects[projectIndex].zip = zip;
				flushProjectCanvas();
				processEV3(file, zip, projectIndex);
			}, function(e) {
				errors.push("File is corrupt or unreadable.");
				showWarningInFileUpload(errors);
			});
	}
	function processEV3(file, zip, projectIndex) {
		const numberOfFiles = objectLength(zip.files);
		var currentFile = 0;
		zip.forEach(function(relativePath, zipEntry) {
			zip.file(zipEntry.name).async("string").then(function(result) {
				const indexOfDot = zipEntry.name.indexOf(".");
				const extension = zipEntry.name.substring(indexOfDot+1);
				const name = zipEntry.name.substring(0, indexOfDot);
				switch (extension) {
					case "ev3p":
						processEV3P(result, projectIndex, extension, name);
						break;
					case "ev3p.mbxml":
						processEV3PMBXML(result, projectIndex, extension, name);
						break;
				}
				if (++currentFile / numberOfFiles == 1) {
					$fileUpload.css('display', 'none');
					$fileUploadClose.css('display', 'none');
					$fileUploadErrors.html('');
					$('#arrange').click();
				}
			});
		});
	}
	function processEV3P(xml, projectIndex, extension, name) {
		var ev3p = new XML(xml);
		var blockDiagram = ev3p.child('Namespace').child('VirtualInstrument').child('BlockDiagram');
		var relationships = [];

		blockDiagram.children().each(function(item, index) {
			switch (item.localName().toString()) {
				case "ConfigurableMethodCall":
					const target = item.attribute('Target').toString().replace("\\", "");
					const indexOfDot = target.lastIndexOf(".");
					const dependencyExtension = target.substring(indexOfDot+1);
					if (dependencyExtension == "ev3p") {
						const dependencyName = target.substring(0, indexOfDot);
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
				var polyGroup = ev3p_mbxml.child('PolyGroups').child('PolyGroup');
				var block = polyGroup.child('Block');
				var blockIndex = projects[projectIndex].blocks.length;
				projects[projectIndex].blocks.push({
					name: name,
					originalName: name,
					description: null,
					iconBaseName: '/assets/'+polyGroup.attribute("IconBaseName").toString()+'_Diagram.png',
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
						this.dom.find('.blockIcon').attr('src', iconBaseName);
						console.log('setIconBaseName')
					},
					setParameterName: function(parameterIndex, name, ignoreUndo) {
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
						$(this.dom.find('.parameterIcon')[parameterIndex]).attr('title', name);
						console.log('setParameterName')
					},
					setParameterDisplayName: function(parameterIndex, displayName, ignoreUndo) {
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
						$(this.dom.find('.parameterIcon')[parameterIndex]).attr('title', displayName);
						console.log('setParameterDisplayName')
					},
					setParameterDirection: function(parameterIndex, direction, ignoreUndo) {
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
						$(this.dom.find('.parameterDataType')[parameterIndex]).attr('src', "/assets/Palette_MyBlock_Parameter_"+direction+"_"+this.params[parameterIndex].dataType+".png");
						$(this.dom.find('.parameterDataType')[parameterIndex]).attr('title', direction+" "+this.params[parameterIndex].dataType);
						console.log('setParameterDirection')
					},
					setParameterIdentification: function(parameterIndex, identification, ignoreUndo) {
						if (!ignoreUndo) {
							projects[projectIndex].undo.push({
								blockIndex: blockIndex,
								parameterIndex: parameterIndex,
								fn: "setParameterIdentification",
								from: this.params[parameterIndex].identification,
								to: identification
							});
						}
						this.params[parameterIndex].identification = identification;
						$(this.dom.find('.parameterIcon')[parameterIndex]).css('display', 'none');
						$(this.dom.find('.parameterIcon')[parameterIndex]).fadeIn();
						$(this.dom.find('.parameterIcon')[parameterIndex]).attr('src', identification);
						console.log('setParameterIdentification')
					},
					setParameterDataType: function(parameterIndex, dataType, ignoreUndo) {
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
						$(this.dom.find('.parameterDataType')[parameterIndex]).attr('src', '/assets/Palette_MyBlock_Parameter_'+this.params[parameterIndex].direction+'_'+dataType+'.png');
						console.log('setParameterDataType')
					},
					setParameterDefaultValue: function(parameterIndex, defaultValue, ignoreUndo) {
						if (!ignoreUndo) {
							projects[projectIndex].undo.push({
								blockIndex: blockIndex,
								parameterIndex: parameterIndex,
								fn: "setParameterDefaultValue",
								from: this.params[parameterIndex].defaultValue,
								to: defaultValue
							});
						}
						this.params[parameterIndex].defaultValue = defaultValue;
						console.log('setParameterDefaultValue')
					},
					setParameterConfiguration: function(parameterIndex, configuration, ignoreUndo) {
						if (!ignoreUndo) {
							projects[projectIndex].undo.push({
								blockIndex: blockIndex,
								parameterIndex: parameterIndex,
								fn: "setParameterConfiguration",
								from: this.params[parameterIndex].configuration,
								to: configuration
							});
						}
						this.params[parameterIndex].configuration = configuration;
						console.log('setParameterConfiguration')
					},
					setParameterMinValue: function(parameterIndex, minValue, ignoreUndo) {
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
					setParameterMaxValue: function(parameterIndex, maxValue, ignoreUndo) {
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
							projects[projectIndex].blocks[blockIndex].description = item.text().toString();
							return;
						case "ParamInfo":
							projects[projectIndex].blocks[blockIndex].params.push({
								name: item.attribute('Name').toString(),
								displayName: item.attribute('DisplayName').toString(),
								direction: item.attribute('Direction').toString(),
								identification: '/assets/'+item.attribute('Identification').toString(),
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
		for (let i = 0; i < errors.length; i++) {
			$fileUpload.find('#errors').append($("<p></p>")
				.html(errors[i]));
		}
		$fileUploadClose.css('display', 'block');
	}
	// FILE HANDLING //
	/////////////////////
	// MY BLOCK EDITOR //
	function displayProject(projectIndex) {
		$projects.children().each(function() {$(this).removeClass("selected");});
		$projects.children().eq(projectIndex).addClass("selected");
		for (var i = 0; i < projects[projectIndex].blocks.length; i++) {
			diplayBlock(projectIndex, i);
		}
		$('#arrange').click();
	}
	function displayRelationships() {
		jsPlumb.detachEveryConnection();
		jsPlumb.deleteEveryEndpoint();
		for (var i = 0; i < projects[currentProjectIndex].blocks.length; i++) {
			const block = projects[currentProjectIndex].blocks[i];
			block.uses = [];
			block.usedBy = [];
		}
		for (var i = 0; i < projects[currentProjectIndex].blocks.length; i++) {
			const block = projects[currentProjectIndex].blocks[i];
			const blockName = block.name;
			const relationships = projects[currentProjectIndex].relationships[blockName];
			block.uses = relationships;
			for (var n = 0; n < relationships.length; n++) {
				distinctPush(projects[currentProjectIndex].getBlockByName(relationships[n]).usedBy, block.name);
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
		$workspace.html('<div id="data-wires"></div>');
		jsPlumb.setContainer($workspace.find("#data-wires"));
	}
	function diplayBlock(projectIndex, blockIndex) {
		const block = projects[projectIndex].blocks[blockIndex];
		var $block = $('<div></div>')
			.addClass('my-block')
			.css('width', (55+(31 * (block.params.length+((block.params.length < 10) ? 1 : 0)))+26)+'px')
			.css('height', 89+'px')
			.css('z-index', blockIndex + 1)
			.on('mousedown', function(e) {
				switch (e.which) {
					case 1:
						blockBeingDragged = $(this);
						blockBeingDraggedOffset = {
							top: e.pageY - parseInt($(this).css('top')),
							left: e.pageX - parseInt($(this).css('left'))
						};

						const myZIndex = $(this).css('z-index');
						const $myBlocks = $('.my-block');
						$myBlocks.each(function(i, element, array) {
							if (i != blockIndex) {
								const zIndex = $(element).css('z-index');
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
				.attr('src', '/assets/Palette_MyBlock_Start.png')
				.on('dragstart', function(e) {
					e.preventDefault();
				})
			)
			.append(
				$('<img></img>')
				.addClass('blockStartDataWire')
				.addClass('rigid')
				.attr('src', '/assets/Palette_MyBlock_Start_DataWire.png')
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
							.html('<b>'+block.name+'</b> is used by the My Blocks:')
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
					vex.dialog.alert({
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
					editBlockIcon(block, blockIndex);
				})
			);
		$workspace.append($block);
		for (var i = 0; i < block.params.length; i++) {
			(function(parameterIndex) {
				$block.append(
						$('<img></img>')
						.addClass('parameterBackground')
						.addClass('rigid')
						.css('left', (55+(31 * i))+'px')
						.attr('title', block.params[parameterIndex].displayName || block.params[parameterIndex].name)
						.attr('src', '/assets/Palette_MyBlock_Parameter.png')
						.on('dragstart', function(e) {
							e.preventDefault();
						})
					)
					.append(
						$('<img></img>')
						.addClass('parameterDataType')
						.addClass('rigid')
						.css('left', (55+(31 * i))+'px')
						.attr('title', block.params[parameterIndex].direction+" "+block.params[parameterIndex].dataType)
						.attr('src', '/assets/Palette_MyBlock_Parameter_'+block.params[i].direction+'_'+block.params[i].dataType+'.png')
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
						.css('left', (55+(31 * i)+5)+'px')
						.attr('title', block.params[parameterIndex].displayName || block.params[parameterIndex].name)
						.attr('src', block.params[i].identification)
						.on('dragstart', function(e) {
							e.preventDefault();
						})
						.click(function() {
							editParameterIcon(block, blockIndex, parameterIndex);
						})
					)
			})(i);
		}
		if (block.params.length < 10) {
			$block.append(
				$('<img></img>')
				.addClass('parameterBackground')
				.addClass('rigid')
				.css('left', (55+(31 * (block.params.length)))+'px')
				.attr('src', '/assets/Palette_MyBlock_Parameter.png')
				.on('dragstart', function(e) {
					e.preventDefault();
				})
			)
			$block.append(
				$('<img></img>')
				.addClass('parameterAdd')
				.addClass('rigid')
				.css('left', (55+(31 * (block.params.length)))+'px')
				.attr('src', '/assets/Palette_MyBlock_AddParameter.png')
				.data('src0', '/assets/Palette_MyBlock_AddParameter.png')
				.data('src1', '/assets/Palette_MyBlock_AddParameter_Hover.png')
				.data('src2', '/assets/Palette_MyBlock_AddParameter_Active.png')
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
				.css('left', (55+(31 * (block.params.length+((block.params.length < 10) ? 1 : 0))))+'px')
				.attr('src', '/assets/Palette_MyBlock_End.png')
				.on('dragstart', function(e) {
					e.preventDefault();
				})
			)
			.append(
				$('<img></img>')
				.addClass('blockEndDataWire')
				.addClass('rigid')
				.attr('src', '/assets/Palette_MyBlock_End_DataWire.png')
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
							.html('<b>'+block.name+'</b> uses the My Blocks:')
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
					vex.dialog.alert({
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
					const userInput = $(this).val();
					const isValid = !(userInput.match(/[^A-Za-z0-9_]/));
					const isEmpty = userInput.length === 0;
					if (e.which === 13) {
						$(this).blur();
						return true;
					}
					var exists = false;
					for (var i = 0; i < projects[currentProjectIndex].blocks.length; i++) {
						if (i === blockIndex) {
							continue;
						}
						if (userInput.toLowerCase() === projects[currentProjectIndex].blocks[i].name.toLowerCase()) {
							exists = true;
							break;
						}
					}
					if (isEmpty) {
						showWarningInVexDialog('My Block name is required.');
					} else if (exists) {
						showWarningInVexDialog('My Block name is in use. Please pick a unique My Block name.');
					} else if (!isValid) {
						showWarningInVexDialog('The My Block name may only contain the following characters:<br>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789_');
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
		vex.dialog.open({
			message: $div,
			afterClose: function($content, result) {
				if (result.value) {
					const currentName = $content.find('#block-name').val();
					const currentDescription = $content.find('#block-description').val();
					if (block.name !== currentName) {
						projects[currentProjectIndex].blocks[blockIndex].setName(currentName);
					}
					if (block.description !== currentDescription) {
						projects[currentProjectIndex].blocks[blockIndex].setDescription(currentDescription);
					}
				}
			}
		});
	}
	function editBlockIcon(block, blockIndex) {
		var selected = blockIcons.indexOf($(this).attr('src'));
		const initial = selected;
		var $div = $('<div></div>')
			.addClass('dialog')
		for (var i = 0; i < blockIcons.length; i++) {
			$div.append(
				$('<img></img>')
				.attr('id', i)
				.addClass((i === selected) ? 'selected' : '')
				.addClass('rigid')
				.attr('data-size', 'lg')
				.attr('src', blockIcons[i])
				.click(function() {
					$('.dialog').find('#'+selected).removeClass('selected');
					selected = parseInt($(this).attr('id'));
					$(this).addClass('selected');
				})
				.on('dragstart', function(e) {
					e.preventDefault();
				})
			);
		}
		vex.dialog.open({
			message: $div,
			afterClose: function($content, result) {
				if (result.value) {
					if (initial != selected) {
						projects[currentProjectIndex].blocks[blockIndex].setIconBaseName(blockIcons[selected]);
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
								.attr('selected', block.params[parameterIndex].direction ===  "Input")
								.html('Input')
								)
							.append(
								$('<option></option>')
								.attr('value', 'Output')
								.attr('selected', block.params[parameterIndex].direction ===  "Output")
								.html('Output')
								)
							.change(function() {
								const currentDirection = $('#parameter-direction').val();
								const currentDataType = $('#parameter-data-type').val();
								const currentConfig = $("input[name=parameter-configuration]:checked").val();
								showConfiguration(currentDirection, currentDataType, currentConfig);
							})
							)
						.append(
							$('<select></select>')
							.attr('id', 'parameter-data-type')
							.append(
								$('<option></option>')
								.attr('value', 'Single')
								.attr('selected', block.params[parameterIndex].dataType ===  "Single")
								.html('Number')
								)
							.append(
								$('<option></option>')
								.attr('value', 'Boolean')
								.attr('selected', block.params[parameterIndex].dataType ===  "Boolean")
								.html('Logic')
								)
							.append(
								$('<option></option>')
								.attr('value', 'String')
								.attr('selected', block.params[parameterIndex].dataType ===  "String")
								.html('Text')
								)
							.append(
								$('<option></option>')
								.attr('value', 'Single[]')
								.attr('selected', block.params[parameterIndex].dataType ===  "Single[]")
								.html('Numeric Array')
								)
							.append(
								$('<option></option>')
								.attr('value', 'Boolean[]')
								.attr('selected', block.params[parameterIndex].dataType ===  "Boolean[]")
								.html('Logic Array')
								)
							.change(function() {
								const currentDirection = $('#parameter-direction').val();
								const currentDataType = $('#parameter-data-type').val();
								const currentConfig = $("input[name=parameter-configuration]:checked").val();
								showConfiguration(currentDirection, currentDataType, currentConfig);
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
									$('#parameter-default-value').val("[True,True,False]");
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
								const currentDataType = $('#parameter-data-type').val();
								const currentDefaultValue = $(this).val();
								showWarningInVexDialog(null);
								if (currentDataType !== "String") {
									if (currentDefaultValue === "") {
										switch (currentDataType) {
											case "Single":
											showWarningInVexDialog("Please enter a default value as a number.");
											break;
											case "Boolean":
											showWarningInVexDialog("Please enter a default value as logic. It should be in the format:<br>True or False.");
											break;
											case "Single[]":
											showWarningInVexDialog("Please enter a default value as a numeric array. It should be in the format:<br>[1,2,3]");
											break;
											case "Boolean[]":
											showWarningInVexDialog("Please enter a default value as a logic array. It should be in the format:<br>[True,True,False]");
											break;
										}
									} else {
										switch (currentDataType) {
											case "Single":
											if (!currentDefaultValue.match(/^\-{0,1}[0-9]+$/)) {
												showWarningInVexDialog("The number default value cannot contain anything other than numbers.");
											}
											break;
											case "Boolean":
											if (!currentDefaultValue.toLowerCase().match(/^((True)|(False))$/i)) {
												showWarningInVexDialog("The logic default value must either be True or False.");
											}
											break;
											case "Single[]":
											if (!currentDefaultValue.match(/^\s*\[\s*(\s*\-{0,1}[0-9]+\s*,\s*)*\s*\-{0,1}[0-9]\s*\]\s*$/)) {
												showWarningInVexDialog("The numeric array default value should be in the format:<br>[1,2,3]");
											}
											break;
											case "Boolean[]":
											if (!currentDefaultValue.match(/^\s*\[\s*(\s*((True)|(False))+\s*,\s*)*\s*((True)|(False))\s*\]\s*$/i)) {
												showWarningInVexDialog("The logic array default value should be in the format:<br>[True,True,False]");
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
									const currentMin = $(this).val();
									if (!currentMin.match(/^\-{0,1}[0-9]+$/)) {
										showWarningInVexDialog("The minimum value cannot contain anything other than numbers.");
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
									const currentMax = $(this).val();
									if (!currentMax.match(/^\-{0,1}[0-9]+$/)) {
										showWarningInVexDialog("The maximum value cannot contain anything other than numbers.");
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
							.css('display', (block.params[parameterIndex].direction === "Input" && block.params[parameterIndex].dataType === "Single")?"block":"none")
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
											$('<input type="radio" name="parameter-configuration" value="" '+((block.params[parameterIndex].configuration==='')?'checked':'')+'>')
											)
										.append(
											$('<img></img>')
											.addClass('rigid')
											.attr('src', '/assets/Palette_MyBlock_Parameter_Style_Single.png')
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
											$('<input type="radio" id="parameter-range-hslider" name="parameter-configuration" value="SliderHorizontal.custom" '+((block.params[parameterIndex].configuration==='SliderHorizontal.custom')?'checked':'')+'>')
											.click(function() {
												$('#parameter-range').css('display', 'block');
												$('#parameter-min').val('-100');
												$('#parameter-max').val('100');
											})
											)
										.append(
											$('<img></img>')
											.addClass('rigid')
											.attr('src', '/assets/Palette_MyBlock_Parameter_Style_HSlider.png')
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
											$('<input type="radio" id="parameter-range-vslider" name="parameter-configuration" value="SliderVertical.custom" '+((block.params[parameterIndex].configuration==='SliderVertical.custom')?'checked':'')+'>')
											.click(function() {
												$('#parameter-range').css('display', 'block');
												$('#parameter-min').val('-100');
												$('#parameter-max').val('100');
											})
											)
										.append(
											$('<img></img>')
											.addClass('rigid')
											.attr('src', '/assets/Palette_MyBlock_Parameter_Style_VSlider.png')
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
		vex.dialog.open({
			message: $div,
			afterClose: function($content, result) {
				if (result.value) {
					const currentName = $content.find("#parameter-name").val().replace(/\s/, "");
					const currentDirection = $content.find("#parameter-direction").val().replace(/\s/, "");
					const currentDataType = $content.find("#parameter-data-type").val().replace(/\s/, "");
					const currentDefaultValue = $content.find("#parameter-default-value").val().replace(/\s/, "");
					const currentConfiguration = $content.find("input[name=parameter-configuration]:checked").val().replace(/\s/, "");
					const currentMin = $content.find("#parameter-min").val().replace(/\s|(null)/, "");
					const currentMax = $content.find("#parameter-max").val().replace(/\s|(null)/, "");
					if (block.params[parameterIndex].displayName !== currentName) {
						block.setParameterDisplayName(parameterIndex, currentName);
					}
					if (block.params[parameterIndex].direction !== currentDirection) {
						block.setParameterDirection(parameterIndex, currentDirection);
					}
					if (block.params[parameterIndex].dataType !== currentDataType) {
						block.setParameterDataType(parameterIndex, currentDataType);
					}
					if (block.params[parameterIndex].defaultValue !== currentDefaultValue) {
						block.setParameterDefaultValue(parameterIndex, currentDefaultValue.substring(0, 1).toUpperCase()+currentDefaultValue.substring(1).toLowerCase());
					}
					if (block.params[parameterIndex].configuration !== currentConfiguration) {
						block.setParameterConfiguration(parameterIndex, currentConfiguration);
					}
					if (block.params[parameterIndex].minValue !== currentMin) {
						block.setParameterMinValue(parameterIndex, currentMin);
					}
					if (block.params[parameterIndex].maxValue !== currentMax) {
						block.setParameterMaxValue(parameterIndex, currentMax);
					}
				}
			}
		});
		showConfiguration(block.params[parameterIndex].direction, block.params[parameterIndex].dataType, block.params[parameterIndex].configuration);

		function showConfiguration(currentDirection, currentDataType, currentConfig) {
			const showConfig = currentDirection === "Input" && currentDataType === "Single";
			$('#parameter-default-value').attr('required', currentDataType !== "String");
			$('#parameter-configuration').css('display', (showConfig)?"block":"none");
			if (showConfig && currentConfig === 'SliderHorizontal.custom' || currentConfig === 'SliderVertical.custom') {
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
		var selected = parameterIcons.indexOf($(this).attr('src'));
		const initial = selected;
		var $div = $('<div></div>')
			.addClass('dialog')
		for (var i = 0; i < parameterIcons.length; i++) {
			$div.append(
				$('<img></img>')
				.attr('id', i)
				.addClass((i === selected) ? 'selected' : '')
				.addClass('rigid')
				.attr('data-size', 'sm')
				.attr('src', parameterIcons[i])
				.click(function() {
					$('.dialog').find('#'+selected).removeClass('selected');
					selected = parseInt($(this).attr('id'));
					$(this).addClass('selected');
				})
				.on('dragstart', function(e) {
					e.preventDefault();
				})
			);
		}
		vex.dialog.open({
			message: $div,
			afterClose: function($content, result) {
				if (result.value) {
					if (initial != selected) {
						projects[currentProjectIndex].blocks[blockIndex].setParameterIdentification(parameterIndex, parameterIcons[selected]);
					}
				}
			}
		});
	}
	function showWarningInVexDialog(warning) {
		if (warning) {
			$('#text-warning').html(warning);
			$('#text-warning').css('display', 'block');
			$('.vex-dialog-buttons').find('button[type=submit]').attr('disabled', true);
			$(this).addClass('warning');
		} else {
			$('#text-warning').css('display', 'none');
			$('.vex-dialog-buttons').find('button[type=submit]').attr('disabled', false);
			$(this).removeClass('warning');
		}
	}
	// MY BLOCK EDITOR //
	/////////////////////
	// UTILITY //
	function distinctPush (array, item) {
		if (array.indexOf(item) == -1) {
			array.push(item);
		}
	}
	function objectLength (obj) {
		var size = 0,
			key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	}
	function rectanglesIntersect(r1, r2) {
		return false;
		return !(r1.x+r1.width<r2.x || r2.x+r2.width<r1.x || r1.y+r1.height<r2.y || r2.y+r2.height<r1.y);
	}
})();
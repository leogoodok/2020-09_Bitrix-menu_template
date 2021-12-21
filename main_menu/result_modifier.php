<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

$arrMenu = [];
$arrParentWindow = [];
$numWindow = 0;
$levelWindow = 0;
$nextWindow = 0;
$arrWindowLevel = [1 => 0];
$j = -1;
$selectedWindow = 0;

foreach($arResult as $keyItem => $arrItem) {
	$isSave = false;
	$depthLevel = $arrItem["DEPTH_LEVEL"];
	$levelWindow = $arrWindowLevel[$depthLevel];
	$arr = $arrItem;
	$arr['indexItem'] = ++$j;

	if ($arrItem["IS_PARENT"]) {
		$isSave = true;
		$arrWindowLevel[$depthLevel + 1] = ++$numWindow;
		$nextWindow = $numWindow;
		$arrParentWindow[$numWindow] = $arr;
		$arrParentWindow[$numWindow]['indexWindow'] = $numWindow;
		$arrParentWindow[$numWindow]['prevWindow'] = $arrWindowLevel[$depthLevel];
		$arrParentWindow[$numWindow]['levelWindow'] = $arrWindowLevel[$depthLevel + 1];
		$arrParentWindow[$numWindow]['depthWindow'] = $depthLevel;
	} else {
		if ($arrItem["PERMISSION"] > "D") {
			$isSave = true;
			$nextWindow = null;
		}
	}

	if ($isSave) {
		$arr['prevWindow'] = $arrWindowLevel[$depthLevel - 1];
		$arr['levelWindow'] = $levelWindow;
		$arr['nextWindow'] = $nextWindow;

		if (!isset($arrMenu[$levelWindow])) {
			$arrMenu[$levelWindow] = [];
		}
		$arrMenu[$levelWindow][] = $arr;

		if ($arr['SELECTED']) {
			if ($arr['IS_PARENT']) {
				$selectedWindow = $arrWindowLevel[$depthLevel + 1];
			} else {
				$selectedWindow = $arrWindowLevel[$depthLevel];
			}
		}
	}
}

$arResult = [];
$arResult['ITEMS'] = $arrMenu;
$arResult['WINDOW'] = $arrParentWindow;
$arResult['SELECTED_WINDOW'] = $selectedWindow;
?>

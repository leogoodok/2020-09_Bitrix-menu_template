<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die(); 

$addLinkToSection = (isset($arParams["ADM_ADD_LINK_TO_SECTION_TITLE"]) && $arParams["ADM_ADD_LINK_TO_SECTION_TITLE"] != "N");

if (!empty($arResult)): 

for ($j = 0, $jCount = count($arResult['ITEMS']); $j < $jCount; $j++): 
	$arrWindow = isset($arResult['WINDOW'][$j]) ? $arResult['WINDOW'][$j] : null;
	$panelPrevWindow = isset($arrWindow['prevWindow']) ? $arrWindow['prevWindow'] : null;
	$depthWindow = isset($arrWindow['depthWindow']) ? $arrWindow['depthWindow'] : null;
	?>

	<div <?= ($j != 0) ? "id=\"copmMenuMainMenuPanel-$j\" " : ''; ?>class="comp__menu--main_menu js-main-submenu__panel menu__panel<?= ($j != 0 && isset($depthWindow)) ? " menu__panel--$depthWindow" : ''; ?><?= ($j != 0) ? " main-menu__panel" : ''; ?><?= ($j != 0 && isset($arResult['SELECTED_WINDOW']) && $j == $arResult['SELECTED_WINDOW']) ? " main-menu__panel--active" : ''; ?>">
		<? if ($j != 0): ?>
			<div class="submenu__control">
				<div class="submenu__control--left">
					<div class="submenu__control__arrow js-main_submenu__btn-close-panel" data-parent-panel="copmMenuMainMenuPanel-<?= $j; ?>"<?= isset($panelPrevWindow) ? " data-prev-panel=\"copmMenuMainMenuPanel-$panelPrevWindow\"" : ''; ?>>
						<img src="<?= SITE_TEMPLATE_PATH . "/images/main_menu/arrow.svg"; ?>" alt="X">
					</div>
				</div>
				<div class="submenu__control--right">
					<? if (isset($arrWindow)): 
						if ($addLinkToSection): ?>

							<a href="<?= !empty($arrWindow["LINK"]) ? $arrWindow["LINK"] : '/'; ?>" class="submenu__control__parent">
						<? else: ?>

							<div class="submenu__control__parent">
						<? endif; ?><? /* Отключение вывода Иконки раздела-родителя
							<? if (!empty($arrWindow["PARAMS"]["IMG_SRC"])): ?>

								<div class="submenu__control__parent__icon">

									<div class="submenu__control__parent__img">
										<img src="<?= $arrWindow["PARAMS"]["IMG_SRC"]; ?>" alt="">
									</div>
								</div>
							<? endif; ?>*/ ?>

								<div class="submenu__control__parent__name">
									<div class="submenu__control__parent__text"><?= $arrWindow["TEXT"]; ?></div>
								</div>
						<? if ($addLinkToSection): ?>

							</a>
						<? else: ?>

							</div>
						<? endif; 
					endif; ?>

				</div>
			</div>
		<? endif; ?>

		<ul class="menu__panel__nav">
		<? for ($i = 0, $iCount = count($arResult['ITEMS'][$j]); $i < $iCount; $i++): 
				$arrItem = $arResult['ITEMS'][$j][$i];
				$levelWindow = isset($arrItem['levelWindow']) ? $arrItem['levelWindow'] : null;
				$nextWindow = isset($arrItem['nextWindow']) ? $arrItem['nextWindow'] : null;
			?>

			<li class="menu__items">
				<? if (isset($nextWindow)): ?>

					<div class="menu__item__link js-main_submenu__btn-open-panel" data-parent-panel="copmMenuMainMenuPanel-<?= $j; ?>"<?= isset($nextWindow) ? " data-next-panel=\"copmMenuMainMenuPanel-$nextWindow\"" : ''; ?>>
				<? else: ?>

					<a href="<?= !empty($arrItem["LINK"]) ? $arrItem["LINK"] : '/'; ?>"<?= !empty($arrItem["PARAMS"]["TARGET"]) ? " target=\"{$arrItem["PARAMS"]["TARGET"]}\"" : '' ?> class="menu__item__link">
				<? endif; ?>

						<div class="menu__item__img">
						<? if (!empty($arrItem["PARAMS"]["IMG_SRC"])): ?>

							<img src="<?= $arrItem["PARAMS"]["IMG_SRC"]; ?>" alt="">
						<? else: ?>

							<div class="menu__item__img__icon"></div>
						<? endif; ?>
						</div>
						<div class="menu__item__text<?= ($j != 0) ? ' submenu__text' : '' ?>"><?= $arrItem["TEXT"]; ?></div>
				<? if (isset($nextWindow)): ?>

					</div>
				<? else: ?>

					</a>
				<? endif; ?>

			</li>
		<? endfor; ?>

		</ul>
	<? if ($j != $jCount - 1): ?>

	</div>
	<? endif; 
	if ($j == 0): ?>

	</div>
	<? endif; 
endfor; 
endif; ?>

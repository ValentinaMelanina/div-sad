<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);
$this->addExternalCss("/bitrix/css/main/bootstrap.css");
$this->addExternalCss("/bitrix/css/main/font-awesome.css");
$this->addExternalCss($this->GetFolder().'/themes/'.$arParams['TEMPLATE_THEME'].'/style.css');
?>
<div class="bx-newslist">
	<div class="classes-list row center-xs">
		<?foreach($arResult["ITEMS"] as $arItem):?>
			<?
			$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
			$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
			?>

			<div class="classes-list__container col-xs-12 col-md-6" id="<?=$this->GetEditAreaId
			($arItem['ID']);?>">
				<div class="classes-list__item">
					<!-- Картинка -->
					<?if($arParams["DISPLAY_PICTURE"]!="N"):?>
						<div class="classes-list__img">
							<img
								class="cover"
								src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>"
								width="<?=$arItem["PREVIEW_PICTURE"]["WIDTH"]?>"
								height="<?=$arItem["PREVIEW_PICTURE"]["HEIGHT"]?>"
								alt="<?=$arItem["PREVIEW_PICTURE"]["ALT"]?>"
								title="<?=$arItem["PREVIEW_PICTURE"]["TITLE"]?>"
								/>
						</div>
					<?endif;?>
					<!-- Описание -->
					<div class="classes-list__content">
						<!-- Название -->
						<?if($arParams["DISPLAY_NAME"]!="N" && $arItem["NAME"]):?>
							<div class="classes-list__title">
								<?=$arItem["NAME"]?>
							</div>
						<?endif;?>

						<!-- Описание (анонс) -->
						<?if($arParams["DISPLAY_PREVIEW_TEXT"]!="N" && $arItem["PREVIEW_TEXT"]):?>
							<div class="classes-list__text">
								<?=$arItem["PREVIEW_TEXT"];?>
							</div>
						<?endif;?>

						<!-- Дополнительная информация -->
						<div class="classes-info row start-xs">
							<!-- Возраст -->
							<div class="classes-info__item">
								<div class="classes-info__text">
									<?=$arItem["DISPLAY_PROPERTIES"]['AGE_LESSON']['VALUE'];?>
								</div>
							</div>
							<!-- Количество детей в группе -->
							<div class="classes-info__item">
								<div class="classes-info__text">
									<?=$arItem["DISPLAY_PROPERTIES"]['SIZE_LESSON']['VALUE'];?>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		<?endforeach;?>
	</div>
	<div class="classes__pagination">
		<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
			<?=$arResult["NAV_STRING"]?>
		<?endif;?>
	</div>
</div>

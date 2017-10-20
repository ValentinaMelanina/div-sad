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
<ul class="classes-navigation">
	<li class="bx-newslist-container classes-navigation__item">
		<a href="?" class="classes-navigation__link <?if($arParams['ACTIVE_ELEMENT']== 0):?>active<?endif?>">
			Все группы
		</a>
	</li>

	<?foreach($arResult["ITEMS"] as $arItem):?>
		<?
		$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
		$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
		?>

		<li class="bx-newslist-container classes-navigation__item" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
			<?if($arParams["DISPLAY_NAME"]!="N" && $arItem["NAME"]):?>
				<a href="<?echo $arItem["DETAIL_PAGE_URL"]?>" class="classes-navigation__link <?if($arParams['ACTIVE_ELEMENT']==$arItem['ID']):?> active<?endif?>">
					<?echo $arItem["NAME"]?>
				</a>
			<?endif;?>
		</li>
	<?endforeach;?>
</ul>

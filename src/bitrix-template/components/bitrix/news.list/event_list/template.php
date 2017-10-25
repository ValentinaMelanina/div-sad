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
?>

<div class="news-list">
	<?foreach($arResult["ITEMS"] as $arItem):?>
	<?
	$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
	$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
	?>
	<div class="news-item" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
		<!-- Картинка -->
		<?if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arItem["PREVIEW_PICTURE"])):?>
			<div class="event__img">
				<img
						class="preview_picture"
						border="0"
						src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>"
						width="<?=$arItem["PREVIEW_PICTURE"]["WIDTH"]?>"
						height="<?=$arItem["PREVIEW_PICTURE"]["HEIGHT"]?>"
						alt="<?=$arItem["PREVIEW_PICTURE"]["ALT"]?>"
						title="<?=$arItem["PREVIEW_PICTURE"]["TITLE"]?>"
						style="float:left"
				/>
			</div>
		<?endif?>

		<!-- Заголовок раздела-->
		<?if($arParams["DISPLAY_NAME"]!="N" && $arItem["NAME"]):?>
			<h2 class="section-title"><?=$arItem["NAME"]?></h2>
		<?endif;?>

		<div class="event-container row">
			<!-- Блок со счетчиком-->
			<div class="event__info col-xs-12 col-md-6">
				<!-- Дата -->
				<?foreach($arItem["DISPLAY_PROPERTIES"] as $pid=>$arProperty):?>
					<div class="event__date">
						<?if($pid == "TIME_EVENT"):?>
							<?$eventDate = MakeTimeStamp($arProperty["VALUE"]);?>
							<?$countdown = FormatDate("Y"."/"."m"."/"."d", $eventDate);?>
							<?=FormatDate("d F Y"." в "."H:i", $eventDate);?>
						<?endif?>
					</div>
				<?endforeach;?>

				<!-- Блок для счетчика -->
				<div class="event__counter" data-start-date="<?=$countdown;?>"></div>

				<!-- Текст анонса -->
				<?if($arParams["DISPLAY_PREVIEW_TEXT"]!="N" && $arItem["PREVIEW_TEXT"]):?>
					<div class="event__text">
						<?echo $arItem["PREVIEW_TEXT"];?>
					</div>
				<?endif;?>

			</div>

			<!-- Блок с формой-->
			<div class="event__form col-xs-12 col-md-6">

				<?$APPLICATION->IncludeComponent(
					"divsad:main.feedback",
					"event-form",
					array(
						"EMAIL_TO" => "mail@melanina.ru",
						"EVENT_MESSAGE_ID" => array(
						),
						"OK_TEXT" => "Спасибо, ваше сообщение принято.",
						"REQUIRED_FIELDS" => array(
						),
						"USE_CAPTCHA" => "N",
						"AJAX_MODE" => "Y",
						"COMPONENT_TEMPLATE" => "event-form"
					),
					false
				);?>
			</div>

		</div>


		<!-- Стандартные поля -->
		<?foreach($arItem["FIELDS"] as $code=>$value):?>
			<small>
			<?=GetMessage("IBLOCK_FIELD_".$code)?>:&nbsp;<?=$value;?>
			</small><br />
		<?endforeach;?>



	</div>

<?endforeach;?>
</div>

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
							<?=$countdown;?>
						<?endif?>
					</div>
				<?endforeach;?>

				<div class="event__counter"></div>

				<!-- Текст анонса -->
				<?if($arParams["DISPLAY_PREVIEW_TEXT"]!="N" && $arItem["PREVIEW_TEXT"]):?>
					<div class="event__text">
						<?echo $arItem["PREVIEW_TEXT"];?>
					</div>
				<?endif;?>

			</div>

			<!-- Блок с формой-->
			<form class="event__form col-xs-12 col-md-6">
				<input class="input event__input" placeholder="Имя"><br>
			</form>
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

<script>
    // Счетчик
    $('.event__counter').countdown('2020/10/10', function(event) {

        function declination(titles, number) {
            var cases = [2, 0, 1, 1, 1, 2];
            return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
        }

        var days = event.offset.days,
            hours = event.offset.hours,
            minutes = event.offset.minutes;

        var dd = declination(['День','Дня','Дней'], days),
            hh = declination(['Час','Часа','Часов'], hours),
            mm = declination(['Минута','Минуты','Минут'], minutes);

        var $this = $(this).html(event.strftime(''
            + '<span>' + days + dd +'</span>'
            + '<span>' + hours + hh +'</span>'
            + '<span>' + minutes + mm +'</span>'));
    });

</script>
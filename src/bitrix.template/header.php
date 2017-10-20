<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<!DOCTYPE html>
<html lang="ru-RU">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?$APPLICATION->ShowTitle()?></title>
	<?
	$APPLICATION->ShowHead();
	use Bitrix\Main\Page\Asset;
	Asset::getInstance()->addCss(SITE_TEMPLATE_PATH.'/css/styles.min.css');
	?>
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css?family=Marmelad" rel="stylesheet">

	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
	<![endif]-->
</head>

<body>
	<?$APPLICATION->ShowPanel();?>
	<div class="wrapper">
	<!-- Header-->
	<header class="header">
		<div class="container">
			<!-- Топ бар-->
			<div class="header__top-bar">
				<!-- Меню-->
				<div class="header__menu">
					<div class="main-menu__wrap">
						<button class="hamburger hamburger--emphatic"><span class="hamburger-box"><span class="hamburger-inner"></span></span></button>
						<ul class="main-menu">
							<li class="main-menu__item"><a class="main-menu__link" href="/index.html">О детском саде</a></li>
							<li class="main-menu__item"><a class="main-menu__link" href="#">Группы</a></li>
							<li class="main-menu__item"><a class="main-menu__link" href="#">Кружки и секции</a></li>
							<li class="main-menu__item"><a class="main-menu__link" href="#">Расписание</a></li>
							<li class="main-menu__item"><a class="main-menu__link" href="#">Контакты</a></li>
						</ul>
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="header__contacts">
					<div class="header__phone">+7 926 055 39 25</div>
					<button class="button button_theme-primary button_size-s header__button-call-back waves-effect">Заказать звонок</button>
				</div>
			</div>
			<!-- Логотип и заголовок-->
			<div class="header__container">
				<div class="header__logo"><img src="/bitrix/templates/divsad/images/logo.png" alt="Частный детский сад - Дивный сад"></div>
				<h1 class="page-title">
					В нашем детском саду вашего ребенка ждет увлекательный мир детства, в котором он сможет проявить
					способности и расскрыть свои таланты.
				</h1>
			</div>
		</div>
	</header>
	<!-- Main-->
	<div class="main">
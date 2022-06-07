<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>PowerStat</title>
    <meta name="description" content="">
    <meta name="author" content="Pawel Stolarczyk">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="assets/main.css">
</head>

<body>

<header>
    <div class="container-header">
        <div class="container-header-logo"> 
            <i class="icon-bolt">  </i> PowerStat
        </div>
        <div class="container-header-icons">
            <div class="container-header-icons-icon toggle-settings">
                <i class="icon-cog"> </i>
            </div>
            <!-- <div class="container-header-icons-icon request-fullscreen">
                <i class="icon-enlarge2"> </i>
            </div> -->
        </div>
    </div>
</header>

<div class="settings-background-hidden">
    <ul class = "settings">

        <h1 class="settings-item"> Dataset 0: </h1>
        <li class="settings-item">
            <label> Label: 
                <input id="label0" type="text" value="Voltage">
            </label>
            <label> Color:
                <input id="color0" type="color" value="#ebd834">
            </label>
        </li>

        <h1 class="settings-item"> Dataset 1: </h1>

        <li class="settings-item">
            <label> Label: 
                <input id="label1" type="text" value="Current">
            </label>
            <label> Color:
                <input id="color1" type="color" value="#343deb">
            </label>
        </li>

        <li class="settings-item">
            <label> Update interval [ms]: 
                <input id="updateInterval" type="number" value="200">
            </label>
            <label> Visible on chart elements: (not worrking yet)
                <input id="onChartElements" type="number" value="50">
            </label>
        </li>

        <li class="settings-item">
            <button class="settings-apply" onclick="updateChartParam()"> Apply settings </button>
        </li>

    </ul>
</div>
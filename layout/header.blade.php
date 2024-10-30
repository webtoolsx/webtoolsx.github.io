<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="style.css">
  <script src="https://code.jquery.com/jquery-3.6.0.slim.min.js"></script>
  @vite(['resources/js/stock_calc.js'])
  @vite(['resources/js/counto.min.js'])
  @vite(['resources/css/style.css'])
  
</head>
<body>
  <div class="container-fluid">
    <!-- nav bar -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary header_bar">
      
      <div class="container-fluid ">
        <div class="col">
          <a class="navbar-brand" href="#"> <img class="main-logo" src="{{ Vite::asset('resources/images/calclogo.jpg') }}" alt="logo"> calc.io</a>
        </div>
      </div>
    </nav>

    <div class="col nav justify-content-end py-1">
      <ul class="nav nav-pills justify-content-end">
        <li class="nav-item">
          <a class="nav-link {{ Request::is('/') ? 'active' : '' }}" aria-current="page" href="/">P/L Calculator</a>
        </li>
        <li class="nav-item">
          <a class="nav-link {{ Request::is('average-calculator') ? 'active' : '' }}" href="/average-calculator">Average Calculator</a>
        </li>
      </ul>
    </div>
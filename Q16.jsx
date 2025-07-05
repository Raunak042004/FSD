<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Responsive Div Layout</title>
  <style>
    .container {
      display: flex;
      gap: 10px;
    }

    .box {
      background-color: #4CAF50;
      color: white;
      padding: 20px;
      flex: 1;
      text-align: center;
    }

    @media (max-width: 600px) {
      .container {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
  </div>
</body>
</html>

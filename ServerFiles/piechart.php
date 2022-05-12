<!DOCTYPE html>
<html>
<head>
    <title>Bar Chart</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <?php 
    $con1=new mysqli('localhost','root','kavish1234','ezzzmart');
    $query=$con1->query("
    SELECT
      PRODUCTS as Products,
        SUM(sales)as Sales
      FROM products
      GROUP BY Products
    ");

    foreach($query as $data){
        $product[]=$data['Products'];
        $sale[]=$data['Sales'];
    }
    ?>



    <div style="width:500px">
        <canvas id="myChart"></canvas>
      </div>

      <script>
    
    const data = {
  labels: [
    'Groceries',
    'Stationary',
    'Clothing',
    'Health'
  ],
    datasets: [{
    label: 'Sales',
    data: <?php echo json_encode($sale)?>,
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(33, 247, 54)'

    ],
    hoverOffset: 4
  }]
};


const config1 = {
  type: 'pie',
  data: data,
};

        var myChart = new Chart(
        document.getElementById('myChart'),
        config1
       ); 

       
       function goback() {
         window.location.href = "../ReportsPage/reports.html";
       }
      </script>
      <button onclick="goback()">Go back</button>
</body>
</html>
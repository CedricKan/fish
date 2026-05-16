<?php
$path = trim($_SERVER['REQUEST_URI'], '/');

// 自动扫描 pages 文件夹生成路由
$routes = [];
$pagesDir = 'pages';

if (is_dir($pagesDir)) {
    $items = scandir($pagesDir);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        
        $fullPath = $pagesDir . '/' . $item;
        
        // 如果是文件夹，检查是否有 index.html
        if (is_dir($fullPath) && file_exists($fullPath . '/index.html')) {
            $routes[$item] = $fullPath . '/index.html';
        }
        // 如果是 .html 文件
        elseif (is_file($fullPath) && pathinfo($fullPath, PATHINFO_EXTENSION) === 'html') {
            $routeName = pathinfo($fullPath, PATHINFO_FILENAME);
            $routes[$routeName === 'home' ? '' : $routeName] = $fullPath;
        }
    }
}

if (isset($routes[$path])) {
    include $routes[$path];
} else {
    http_response_code(404);
    echo '<h1>404 Not Found</h1>';
}
?>
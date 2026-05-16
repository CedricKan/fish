<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

$path = trim($_SERVER['REQUEST_URI'], '/');
$method = $_SERVER['REQUEST_METHOD'];

$segments = explode('/', $path);

if ($segments[0] !== 'api') {
    http_response_code(404);
    echo json_encode(['status' => 'error', 'message' => 'Not Found']);
    exit;
}

$endpoint = $segments[1] ?? '';
$handlerName = 'handle' . ($endpoint === '' ? 'Home' : ucfirst($endpoint));

if (function_exists($handlerName)) {
    $handlerName();
} else {
    http_response_code(404);
    echo json_encode(['status' => 'error', 'message' => 'Not Found']);
}

function handleHome() {
    echo json_encode([
        'status' => 'success',
        'message' => '欢迎来到养鱼社团 API！',
        'data' => [
            'name' => '养鱼社团',
            'slogan' => '遇见你的下一口缸。',
            'description' => '从开缸到成景，与志同道合的人一起，把水质、灯光与生物搭配做到极致。'
        ]
    ]);
}

function handleAbout() {
    echo json_encode([
        'status' => 'success',
        'data' => [
            'title' => '关于我们',
            'content' => '我们是一群热爱水族的爱好者，致力于分享养鱼经验和知识。',
            'activities' => ['工坊', '讲座', '线下交流', '线上讨论']
        ]
    ]);
}

function handleJoin() {
    echo json_encode([
        'status' => 'success',
        'data' => [
            'title' => '加入我们',
            'requirements' => ['热爱水族', '遵守社团规则', '积极参与活动'],
            'benefits' => ['专属聊天室', '活动优先报名', '技术指导']
        ]
    ]);
}

function handleChat() {
    echo json_encode([
        'status' => 'success',
        'data' => [
            'title' => '成员聊天室',
            'description' => '晒缸、问病、约线下——把日常养护聊成一种习惯。',
            'onlineCount' => rand(10, 50)
        ]
    ]);
}

function handleDonate() {
    echo json_encode([
        'status' => 'success',
        'data' => [
            'title' => '捐赠支持',
            'description' => '支持社团活动与公共设备，透明公示，用在看得见的地方。',
            'totalDonated' => '¥12,345'
        ]
    ]);
}
?>
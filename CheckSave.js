SUCCESS_TAG = 'CheckSave Success';
ERROR_TAG = 'CheckSave Error';

function makeRequest(request_body, response_body) {
    var body;
    try {
        body = {
            deviceId: request_body['deviceId'],
            username: request_body['employeeNumber'],
            x: request_body['x'],
            y: request_body['y'],

            type: response_body['type'],
            date: response_body['data']['sysDate'],
            location: response_body['data']['location'],
            site: response_body['data']['site'],
        };
        console.log(JSON.stringify(body));
    } catch (e) {
        console.log(`${ERROR_TAG}, body 构造失败, ${e}`);
    }
}

// 执行打卡
$task.fetch($request).then(
    (response) => {
        try {
            const request_body = JSON.parse($request.body);
            const response_body = JSON.parse(response.body);
            const myRequest = makeRequest(request_body, response_body);
            postToServer(myRequest);
        } catch (e) {
            console.log(`${ERROR_TAG}, JSON 解析失败, ${e}`);
            $notify(ERROR_TAG, '打卡失败', 'JSON 解析失败');
        }
        $done(response);
    },
    (reason) => {
        $notify(ERROR_TAG, '打卡失败', reason.error);
        $done();
    }
);

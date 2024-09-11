$task.fetch($request).then(
    (response) => {
        try {
            const request_body = JSON.parse($request.body);
            const response_body = JSON.parse(response.body);
            const checkRecord = {
                // 请求体提取
                deviceId: request_body['deviceId'],
                username: request_body['employeeNumber'],
                x: request_body['x'],
                y: request_body['y'],
                // 响应体提取
                date: response_body['data']['sysDate'],
                location: response_body['data']['location'],
                site: response_body['data']['site'],
            };
            // 之前存储的记录
            let savedRecords = $prefs.valueForKey('checkRecords') || '[]';
            savedRecords = JSON.parse(savedRecords);
            // 将新的记录添加到数组中
            savedRecords.push(checkRecord);
            // 将更新后的打卡记录持久化存储
            $prefs.setValueForKey(JSON.stringify(savedRecords), 'checkRecords');
        } catch (e) {
            $notify('CheckSave Error', '存储失败', e.message);
        }
        $done(response);
    },
    (reason) => {
        $notify('CheckSave Error', '打卡失败', reason.error);
        $done();
    }
);

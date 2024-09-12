$task.fetch($request).then(
    (response) => {
        try {
            const request_body = JSON.parse($request.body);
            const response_body = JSON.parse(response.body);
            if (response_body['status'] == '0') {
                $done(response);
            }

            const checkRecord = {
                deviceId: request_body['deviceId'],
                username: request_body['employeeNumber'],
                x: request_body['x'],
                y: request_body['y'],

                date: response_body['data']['sysDate'],
                location: response_body['data']['location'],
                site: response_body['data']['site'],
            };
            let savedRecords = $prefs.valueForKey('checkRecords') || '[]';
            savedRecords = JSON.parse(savedRecords);
            savedRecords.push(checkRecord);
            const result = $prefs.setValueForKey(
                JSON.stringify(savedRecords),
                'checkRecords'
            );
            if (!result) {
                throw new Error(`setValueForKey: ${result}`);
            }
        } catch (e) {
            $notify('CheckSave Error 存储失败', '', e.message);
        }
        $done(response);
    },
    (reason) => {
        $notify('CheckSave Error 打卡失败', '', reason.error);
        $done();
    }
);

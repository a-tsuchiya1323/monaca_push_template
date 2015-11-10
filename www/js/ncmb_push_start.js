// This is a JavaScript file

var appKey    = "YOUR_APP_KEY";
var clientKey = "YOUR_CLIENT_KEY";
var senderId  = "YOUR_ANDROID_SENDERID";
var ncmb = new NCMB(appKey,clientKey);

///// Called when app launch
$(function() {
});

/////Installation registration
document.addEventListener("deviceready", function()
{
    // プッシュ通知受信時のコールバックを登録します
    window.NCMB.monaca.setHandler
    (
        function(jsonData){
            // 送信時に指定したJSONが引数として渡されます
            alert("callback :::" + JSON.stringify(jsonData));
        }
    );
    // デバイストークンを取得してinstallation登録が行われます
    // ※ aplication_key,client_keyはニフティクラウドmobile backendから発行されたkeyに置き換えてください
    // ※ sender_idは【GCMとの連携に必要な準備】で作成したProjectのProject Numberを入力してください
    window.NCMB.monaca.setDeviceToken(appKey, clientKey, senderId);
    // 開封通知登録の設定
    // trueを設定すると、開封通知を行う
    window.NCMB.monaca.setReceiptStatus(true);
    //alert("DeviceToken is registed");
},false);

function startInstallationRegistration() {
    // 登録されたinstallationのobjectIdを取得します。
    window.NCMB.monaca.getInstallationId(
        function(id) {
            var place = document.getElementById("place").value;
            var age = document.getElementById("age").value;
            //サーバーへの更新実施
            ncmb.Installation.fetchById(id)
                 .then(function(installation){
                    ////端末のPlaceの値を設定
                    installation.set("Place", place);
                    ////端末のAgeの値を設定
                    installation.set("Age", age);
                    return installation.update();
                  })
                 .then(function(installation){
                    // 更新後の処理
                    alert("登録完了");
                  })
                 .catch(function(err){
                    // エラー処理
                    alert("エラー発生");
                  });
        }
    );
}

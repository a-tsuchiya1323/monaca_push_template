// This is a JavaScript file

var appKey    = "YOUR_APP_KEY";
var clientKey = "YOUR_CLIENT_KEY";
var senderId  = "YOUR_ANDROID_SENDERID";

///// Called when app launch
$(function() {
  NCMB.initialize(appKey, clientKey);
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
            var InstallationCls = NCMB.Object.extend("installation");
            var installation = new InstallationCls();
            var query = new NCMB.Query(InstallationCls);
            query.get(id, {
                success: function(inst) {
                    ////端末のPlaceの値を設定
                    inst.set("Place", place);
                    ////端末のAgeの値を設定
                    inst.set("Age", age);
                    inst.save(null, {
                        success: function(obj) {
                          // 保存完了後に実行される
                          alert("プッシュ通知受信登録成功！"); 
                        },
                        error: function(obj, error) {
                          // エラー時に実行される
                          alert("登録失敗！次のエラー発生: " + error.message);
                        }
                    });
                }, 
                error: function(inst, error) {
                    alert("登録失敗！次のエラー発生: " + error.message);
                }
            });
        }
    );
}
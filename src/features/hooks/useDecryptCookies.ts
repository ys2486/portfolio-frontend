import { useCallback } from 'react';
import Cookies from 'js-cookie';
import crypto from 'crypto-js';

// -----------------------------------------------------------------
// Cookies復号化処理
// 　・概要　　：Cookiesの暗号化データを復号化し取り出す処理
// 　・引数　　：復号化したいCookieのキー名と、復号化キー（decryptCookiesの引数）
// 　　　　　　　keys:{
// 　　　　　　　　　CookieKey: string;
// 　　　　　　　　　DecryptKey: string | crypto.lib.WordArray;//
// 　　　　　　　}
// 　・戻り値　：復号化後のデータ
// 　　　　　　　decryptedData
// -----------------------------------------------------------------

//引数のタイプ
type DecryptType = {
  CookieKey: string;
  DecryptKey: string | crypto.lib.WordArray;
};

export const useDecryptCookies = () => {
  const decryptCookies = useCallback((keys: DecryptType) => {
    const { CookieKey, DecryptKey } = keys;

    //クッキーから暗号化済みの値を取得
    const ecryptedData = Cookies.get(CookieKey)!;
    //取得した値を復号化
    const decryptedData = crypto.AES.decrypt(ecryptedData, DecryptKey).toString(
      crypto.enc.Utf8
    );

    return decryptedData;
  }, []);
  return { decryptCookies };
};

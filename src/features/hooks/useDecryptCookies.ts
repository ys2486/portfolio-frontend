import { useCallback } from 'react';
import Cookies from 'js-cookie';
import crypto from 'crypto-js';

// -----------------------------------------------------------------
// Cookies復号化処理
// 　・概要　　：Cookiesの暗号化データを復号化し取り出す処理
// 　・引数　　：復号化したいCookieのキー名と、復号化キー
// 　　　　　　　keys:{
// 　　　　　　　　　CookieKey: string;
// 　　　　　　　　　DecryptKey: string | crypto.lib.WordArray;//
// 　　　　　　　}
// 　・戻り値　：復号化後のデータ
// 　　　　　　　decryptedData
// -----------------------------------------------------------------
export const useDecryptCookies = () => {
  type DecryptType = {
    CookieKey: string;
    DecryptKey: string | crypto.lib.WordArray;
  };

  const decryptCookies = useCallback((keys: DecryptType) => {
    const { CookieKey, DecryptKey } = keys;
    const ecryptedData = Cookies.get(CookieKey)!;
    const decryptedData = crypto.AES.decrypt(ecryptedData, DecryptKey).toString(
      crypto.enc.Utf8
    );
    return decryptedData;
  }, []);
  return { decryptCookies };
};

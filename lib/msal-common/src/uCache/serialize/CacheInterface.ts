/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Deserializer } from "./Deserializer";
import { AccessTokenCache, IdTokenCache, RefreshTokenCache, AccountCache, AppMetadataCache, StringDict } from "../../utils/MsalTypes";

export type JSONContent = {
    accessTokens: StringDict;
    idTokens: StringDict;
    refreshTokens: StringDict;
    accounts: StringDict;
    appMetadata: StringDict;
};

export class CacheInterface {

    /**
     * serialize the JSON blob
     * @param data
     */
    static serializeJSONBlob(data: string): string {
        return JSON.stringify(data);
    }

    /**
     * Parse the JSON blob in memory and deserialize the content
     * @param cachedJson
     */
    static deserializeJSONBlob(jsonFile?: any): JSONContent {
        let jsonContent: JSONContent = {
            accessTokens: {},
            idTokens: {},
            refreshTokens: {},
            accounts: {},
            appMetadata: {}
        };

        const ParsedJSON = jsonFile ? jsonFile : null;
        if (!ParsedJSON) {
            return jsonContent;
        }

        jsonContent = {
            accessTokens: ParsedJSON.AccessToken,
            idTokens: ParsedJSON.IdToken,
            refreshTokens: ParsedJSON.RefreshToken,
            accounts: ParsedJSON.Account,
            appMetadata: ParsedJSON.AppMetadata
        };

        return jsonContent;
    }

    /**
     * Generate in memory access token cache
     * @param jsonAT
     */
    static generateAccessTokenCache(jsonAT: StringDict): AccessTokenCache {
        return Deserializer.deSerializeAccessTokens(jsonAT);
    }

    /**
     * Generate in memory id token Cache
     * @param jsonIdT
     */
    static generateIdTokenCache(jsonIdT: StringDict): IdTokenCache {
        return Deserializer.deSerializeIdTokens(jsonIdT);
    }

    /**
     * Generate in memory refresh token cache
     * @param jsonRT
     */
    static generateRefreshTokenCache(jsonRT: StringDict): RefreshTokenCache {
        return Deserializer.deSerializeRefreshTokens(jsonRT);
    }

    /**
     * Generate in memory account cache
     * @param jsonAcc
     */
    static generateAccountCache(jsonAcc: StringDict): AccountCache {
        return Deserializer.deSerializeAccounts(jsonAcc);
    }

    /**
     * Generate in memory appmetadata cache
     * @param jsonAmdt
     */
    static generateAppMetadataCache(jsonAmdt: StringDict): AppMetadataCache {
        return Deserializer.deserializeAppMetadata(jsonAmdt);
    }
}
export interface PlayerInfoModel {
    username: string;
    password: string;
    socialClubId: string;
    hardwareId: string;
    admin: string;
    warns: number;
    isBanned: boolean;
    isMuted: boolean;
    isGroup: boolean;
    groupname: string;
    grouprang: number;
    isPrivatFraktion: boolean;
    privatfraktionname: string;
    privatfraktionrang: number;

    disabledWeapons: [];
}
export interface IGame {
    // public Nullable<int> LocationId { get; set; }
    // public Nullable<System.DateTime> GameDt { get; set; }
    id: number;
    portalId: number;
    seasonId: number;
    locationId: number;
    gameDt: Date;

}
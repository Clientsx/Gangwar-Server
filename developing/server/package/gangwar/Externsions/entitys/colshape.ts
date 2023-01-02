export interface IShape extends ColshapeMp {
    isSaveZone: boolean;
    isSoundZone: boolean;

    getShapeType: number;
    getShapeTriggerEvent: string | undefined;
    getShapeMaxTriggerArgs: number;
    getShapeTriggerEventArg1: any | undefined;
    getShapeTriggerEventArg2: any | undefined;
    getShapeTriggerEventArg3: any | undefined;
    getShapeTriggerEventArg4: any | undefined;
    getShapeTriggerEventArg5: any | undefined;

    getShapeData: any | undefined;
    getShapeMaxData: number;
    getShapeDataArg1: any | undefined;
    getShapeDataArg2: any | undefined;
    getShapeDataArg3: any | undefined;

    //type 0 = Shape für E Taste
    //type 1 = Shape nur rein gehen mit event callen
    //type 2 = Shape nur für E Taste und data geben
}
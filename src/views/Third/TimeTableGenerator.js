import TimeTableTypes from "./TimeTableTypes";

export default class TimeTableGenerator {
  constructor() {}

  static isLecturerFree(startTime, endTime, dayOfWeek) {}

  static isSubjectFree(startTime, endTime, dayOfWeek) {}

  static isRoomFree(startTime, endTime, dayOfWeek) {}

  static checkIfBatchTableAlreadyExists(typeId, storeTimeTables) {
    console.log(storeTimeTables);
    const timeTables = storeTimeTables.findIndex(
      (table) =>
        table &&
        table.type === TimeTableTypes.BATCH &&
        typeId === table.typePayload.bId
    );
    if (timeTables !== -1) {
      return true;
    }
    return false;
  }

  static createTimeTable(
    name,
    numOfWorkingDays,
    workingHours,
    timeSlot,
    days,
    events,
    type,
    typePayload
  ) {
    return {
      id: Date.now(),
      name,
      numOfWorkingDays,
      workingHours,
      timeSlot,
      days,
      events,
      type,
      typePayload,
    };
  }
}

import moment from "moment";

export const formatTime = (time) => moment.utc(time).format("mm:ss.SS");
export interface participantdata {
  participantid: string,
  titlevalue: string,
  subtitlevalue: string,
  paragraph: string,
  imgsrc: string,
  downloadcvurl: string,
  subcategory: string,
  datesstr: string,
  groupid: number,
  datadisplay: number
}
export interface groupedparticipants {
  groupname: string,
  participantlist: participantdata[]
}

export interface participantgroup {
  groupid: number,
  groupname: string,
  parentgroupname: string,
  datadisplay: number
}


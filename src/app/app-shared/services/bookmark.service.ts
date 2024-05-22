import { Injectable } from "@angular/core";

@Injectable()
export class AccountService {
  constructor( ) {}

    removeBookmarkLocal(itemId: number, typeId: number) {
      if (!itemId || itemId == 0) {
        return;
      }
      const lexItem = this.UserBookmarkList.filter(a => a.bookmarktypeid == typeId && a.saveditemid == itemId);
      if (lexItem.length == 0) {
        return;
      }
      const index: number = this.UserBookmarkList.indexOf(lexItem[0]);
      if (index !== -1) {
        this.UserBookmarkList.splice(index, 1);
      }
    }

}

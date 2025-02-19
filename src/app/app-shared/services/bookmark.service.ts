import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { ConfigJsonService } from "./configjson.service";

@Injectable()
export class BookMarkService {
  constructor(private configJsonService:ConfigJsonService) { }
  UserBookmarkList: any[] = [];

  removeBookmarkLocal(itemId: number, typeId: number) {
    if (!itemId) return; // Exit early if itemId is falsy (e.g., 0, null, undefined)
  
    // Check if UserBookmarkList is a BehaviorSubject or a normal array
    if (this.UserBookmarkList instanceof BehaviorSubject) {
      // It's a BehaviorSubject, so get the current value (array)
      const bookmarks = this.UserBookmarkList.getValue();
  
      // Find index of the bookmark to remove
      const index = bookmarks.findIndex((a : any ) => a.bookmarktypeid === typeId && a.saveditemid === itemId);
      if (index === -1) return; // Item not found
  
      // Remove item from array
      bookmarks.splice(index, 1);
  
      // Update BehaviorSubject with a new array reference (ensures Angular detects changes)
      this.UserBookmarkList.next([...bookmarks]); 
    } 
    
    else if (Array.isArray(this.UserBookmarkList)) {
      // It's a normal array, modify it directly
      const index = this.UserBookmarkList.findIndex(a => a.bookmarktypeid === typeId && a.saveditemid === itemId);
      if (index === -1) return;
  
      this.UserBookmarkList.splice(index, 1); // Modify array directly
    } 
    
    else {
      console.error("UserBookmarkList is neither an array nor a BehaviorSubject.");
    }
  }

  social_share_url(word: string): string {


    const fullURL = `${this.configJsonService.ShareUrl}${word.toString()}`;

    return fullURL;//this.shareUrl.concat(word.trimLeft().trimRight());
  }

}

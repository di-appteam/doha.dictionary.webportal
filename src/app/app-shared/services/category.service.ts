import { Injectable } from '@angular/core';

export interface Category {
  label: string; // Display label
  routerLink?: string; // Route link for the category
  externalLink?: string; // External URL if applicable
  permission?: string[]; // Optional permissions
  children?: Category[]; // Subcategories for dropdowns
  style?: { [key: string]: string }; // Inline styles
  isEditable?: boolean; // Determines if the category is editable
  order?: number; // Display order
  displayInMenu?: boolean; // Determines if the category is displayed in the menu
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: Category[] = [
    {
      label: 'عن المعجم',
      order: 1,
      displayInMenu: true,
      isEditable: true,
      children: [
        { label: 'كلمة المعجم', routerLink: '/dictionary-word', order: 1, isEditable: true, displayInMenu: true },
        { label: 'مقدمة المعجم', routerLink: '/about-dictionary', order: 2, isEditable: true, displayInMenu: true },
        { label: 'قرارات المجلس العلمي', routerLink: '/council-decision', order: 3, isEditable: true, displayInMenu: true },
        { label: 'الدليل المعياري', routerLink: '/standard-guide', order: 4, isEditable: true, displayInMenu: true },
        { label: 'المشاركون فى المعجم', routerLink: '/participants', order: 5, isEditable: true, displayInMenu: true },
        { label: 'دليل الاستعمال', routerLink: '/user-guide', order: 6, isEditable: true, displayInMenu: true },
      ],
    },
    { label: 'المعجم', routerLink: '/dictionary', order: 2, isEditable: true, displayInMenu: true },
    { label: 'مصادر المعجم', routerLink: '/bibliography', order: 3, isEditable: true, displayInMenu: true },
    { label: 'المدونة اللغوية', routerLink: '/corpus', order: 4, isEditable: true, displayInMenu: true },
    { label: 'إحصاءات', routerLink: '/charts', order: 5, isEditable: true, displayInMenu: true },
    {
      label: 'الموقع الإخباري',
      externalLink: 'https://news.dohadictionary.org/ar/Pages/default.aspx',
      order: 6,
      isEditable: false,
      displayInMenu: true,
      style: { color: '#000', fontWeight: '700' },
    },
    {
      label: 'تواصل معنا',
      routerLink: '/contact-us',
      order: 7,
      isEditable: true,
      displayInMenu: true,
    },
  ];


  /**
     * Flatten the categories array, including children as individual rows.
     */
  flattenCategories(): any[] {
    var flattenedCategories: any[] = [];
    this.categories.forEach(category => {
      // Push the main category
      flattenedCategories.push({ ...category, isChild: false });

      // Push each child, marking it as a child
      if (category.children) {
        category.children.forEach(child =>
          flattenedCategories.push({ ...child, isChild: true })
        );
      }
    });
    return flattenedCategories;
  }
  getCategories(): Category[] {
    return this.categories;
  }
 /**
   * Adds a new category to the list
   * @param category - The category to be added
   * @returns boolean - True if the category was added, false otherwise
   */
  addCategories(category: Category): boolean {
    // Check for duplicate category names
    const exists = this.categories.some(
      (cat) => cat.label === category.label && cat.order === category.order
    );
    if (exists) {
      console.error('Category already exists:', category);
      return false;
    }

    // Add the category
    this.categories.push(category);
    console.log('Category added successfully:', category);
    return true;
  }

  /**
   * Deletes a category from the list
   * @param category - The category to be deleted
   * @returns boolean - True if the category was deleted, false otherwise
   */
  deleteCategories(category: Category): boolean {
    const index = this.categories.findIndex(
      (cat) => cat.label === category.label && cat.order === category.order
    );
    if (index === -1) {
      console.error('Category not found:', category);
      return false;
    }

    // Remove the category
    this.categories.splice(index, 1);
    console.log('Category deleted successfully:', category);
    return true;
  }
}

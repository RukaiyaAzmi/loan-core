export class Paginate {
  public total: number;
  public limit: number;
  public pages: number = 0;
  public nextPage: number | null = null;
  public previousPage: number | null = null;
  public currentPage: number;
  public hasNextPage: boolean = false;
  public hasPreviousPage: boolean = false;
  public skip: number = 0;
  public pageValid: boolean = false;

  constructor(total: number, limit: number, currentPage: number) {
    this.total = total;
    this.limit = limit;
    this.currentPage = currentPage;
    this.calPages();
    this.currentPageValid();
    this.calNextPage();
    this.calPreviousPage();
    this.calSkip();
    this.calLimit();
  }

  protected calPages() {
    this.pages = Math.ceil(this.total / this.limit);
  }

  protected currentPageValid() {
    this.pageValid =
      this.currentPage <= this.pages && this.currentPage > 0 ? true : false;
  }
  protected calNextPage() {
    if (this.pageValid && this.currentPage < this.pages) {
      this.nextPage = this.currentPage + 1;
      this.hasNextPage = true;
    }
  }
  protected calPreviousPage() {
    if (this.pageValid && this.currentPage > 1) {
      this.previousPage = this.currentPage - 1;
      this.hasPreviousPage = true;
    }
  }
  protected calSkip() {
    if (this.pageValid) {
      this.skip = this.limit * (this.currentPage - 1);
    }
  }
  protected calLimit() {
    !this.limit && (this.limit = this.total);
  }
}

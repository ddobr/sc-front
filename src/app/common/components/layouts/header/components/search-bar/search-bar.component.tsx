import { isAnyMobile } from "../../../../../services/is-mobile.service";
import { MobileSearchBar } from "./mobile/search-bar.mobile.component";
import { WebSearchBar } from "./web/search-bar.web.component";

export const SearchBar = isAnyMobile ? MobileSearchBar : WebSearchBar;
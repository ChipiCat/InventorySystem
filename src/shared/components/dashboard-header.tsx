import { HeaderLogo } from "./layout/HeaderLogo";
import { SearchBar } from "./layout/SearchBar";
import { NotificationsMenu } from "./layout/NotificationsMenu";
import { UserMenu } from "./layout/UserMenu";
import { ThemeToggle } from "./theme-toggle";

export const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between w-full bg-background/95 backdrop-blur-sm px-6 py-4">
      <div className="flex items-center space-x-4">
        <HeaderLogo />
      </div>

      <SearchBar />

      <div className="flex items-center space-x-3">
        <NotificationsMenu />
        <ThemeToggle />
        <UserMenu />
      </div>
    </div>
  );
};

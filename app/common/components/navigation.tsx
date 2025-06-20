import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { BarChartIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/common/components/ui/navigation-menu";

import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { Separator } from "~/common/components/ui/separator";

const menus = [
  {
    name: "Products",
    to: "/products",
    items: [
      {
        name: "Leaderboards",
        description: "See the top performers in your community",
        to: "/products/leaderboards",
      },
      {
        name: "Categories",
        description: "See the top categories in your community",
        to: "/products/categories",
      },
      {
        name: "Search",
        description: "Search for a product in your community",
        to: "/products/search",
      },
      {
        name: "Submit a Product",
        description: "Submit a product to the community",
        to: "/products/submit",
      },
      {
        name: "Promote a Product",
        description: "Promote a product to the community",
        to: "/products/promote",
      },
    ],
  },
  {
    name: "Jobs",
    to: "/jobs",
    items: [
      {
        name: "Remote Jobs",
        description: "find a remote job in your community",
        to: "/jobs?location=remote",
      },
      {
        name: "Full-Time Jobs",
        description: "find an on-site job in your community",
        to: "/jobs?location=full-time",
      },
      {
        name: "Freelance Jobs",
        description: "find a freelance job in your community",
        to: "/jobs?location=freelance",
      },
      {
        name: "Internships",
        description: "find an internship in your community",
        to: "/jobs?location=internship",
      },
      {
        name: "Submit a Job",
        description: "submit a job to the community",
        to: "/jobs/submit",
      },
    ],
  },
  {
    name: "Community",
    to: "/community",
    items: [
      {
        name: "All posts",
        description: "See all posts in the community",
        to: "/community",
      },
      {
        name: "Top Posts",
        description: "See the top posts in the community",
        to: "/community?sort=top",
      },
      {
        name: "New Posts",
        description: "See the new posts in the community",
        to: "/community?sort=new",
      },
      {
        name: "Create a Post",
        description: "Create a post to the community",
        to: "/community/create",
      },
    ],
  },
  {
    name: "IdeasGPT",
    to: "/ideasgpt",
    items: [
      {
        name: "IdeasGPT",
        to: "/ideasgpt",
      },
      {
        name: "Teams",
        to: "/teams",
        items: [
          {
            name: "All Teams",
            description: "See all teams in the community",
            to: "/teams",
          },
          {
            name: "Create a Team",
            description: "Create a team to the community",
            to: "/teams/create",
          },
        ],
      },
    ],
  },
];

export default function Navigation({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav
      className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50
    bg-background/50"
    >
      <div className="flex items-center">
        <Link to="/" className="font-bold tracking-tighter text-2xl">
          wemake
        </Link>
        <Separator orientation="vertical" className="h-6 mx-4" />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] font-light gap-3 p-4 grid-cols-2">
                    {menu.items?.map((item) => (
                      <NavigationMenuItem key={item.name}>
                        <NavigationMenuLink asChild>
                          <Link to={item.to}>{item.name}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {!isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/73378472?v=4" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/analytics">
                  <BarChartIcon className="w-4 h-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <UserIcon className="w-4 h-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">
                  <SettingsIcon className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/auth/logout">
                  <LogOutIcon className="w-4 h-4" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link to="/auth/login">login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/register">register</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}

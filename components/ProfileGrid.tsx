import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaLinkedin } from "react-icons/fa";

const profiles = [
  {
    id: 1,
    name: "Jane Doe",
    title: "Software Engineer at Google",
    image: "/images/jane.jpg",
  },
  {
    id: 2,
    name: "John Smith",
    title: "Product Manager at Meta",
    image: "/images/john.jpg",
  },
  {
    id: 3,
    name: "Alice Johnson",
    title: "Data Scientist at Amazon",
    image: "/images/alice.jpg",
  },
  {
    id: 4,
    name: "Michael Brown Marsh Orbin",
    title: "UI/UX Designer at Apple",
    image: "/images/michael.jpg",
  },
];

const ProfileGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 px-3 py-6 md:py-12">
      {profiles.map((profile) => (
        <Card key={profile.id} className="p-4 shadow-lg rounded-2xl">
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="w-20 h-20 mb-4">
              <AvatarImage src={profile.image} alt={profile.name} />
            </Avatar>
            <h3 className="text-lg font-semibold">{profile.name}</h3>
            <p className="text-sm text-gray-500">{profile.title}</p>
            <Button className="mt-4 flex items-center gap-2">
              <FaLinkedin /> Connect
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfileGrid;

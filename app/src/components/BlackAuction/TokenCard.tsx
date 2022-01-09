import React, { useState, useEffect, } from "react"
import { chakra, useColorModeValue, Box} from "@chakra-ui/react"
import { toHttpPath } from "../../utils";
import { ERC721MetadataExt } from "../../models/types"

type CheckmarkProps = {
  selected: boolean
}

 /* eslint-disable @typescript-eslint/no-explicit-any */
const Checkmark = ({ selected }: CheckmarkProps) => (
  <div
    style={
      selected
        ? { left: "4px", top: "4px", position: "absolute", zIndex: "1" }
        : { display: "none" }
    }
  >
    <svg
      style={{ fill: "white", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <circle cx="12.5" cy="12.2" r="8.292" />
    </svg>
    <svg
      style={{ fill: "#06befa", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </div>
);

const imgStyle = {
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
const selectedImgStyle = {
  transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
const cont: any = {
  //backgroundColor: "#CBD5E0",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  left: 0,
  top: 0,
  //borderRadius: "20px"
};

export const TokenCard = ({ 
  photo,
  margin,
  direction,
  top,
  left,
  selected,
  onSelect = (f: any) => f 
 }: any) => {

  const [metadata, setMetadata] = useState<ERC721MetadataExt>(ERC721MetadataExt.Default)
  
  useEffect(() => {
    async function fetchSource() {
      console.log("CARD fetch", photo.deedId)
      try {
        const response = await fetch(toHttpPath(photo.src));
        if (response.ok) {
          const { name, description, image } = await response.json();
          setMetadata(new ERC721MetadataExt(name, description, toHttpPath(image)))
        } else {
          const errorMessage = await response.text()
          console.log("Error:", errorMessage)
        }
      } catch (error) {
        console.log("Error:", error)
      }
    }
    fetchSource()
  }, [])

  const [isSelected, setIsSelected] = useState(selected);
  //calculate x,y scale
  const sx = (100 - (30 / photo.width) * 100) / 100;
  const sy = (100 - (30 / photo.height) * 100) / 100;
  selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

  if (direction === "column") {
    cont.position = "absolute";
    cont.left = left;
    cont.top = top;
  }

  const handleOnClick = () => {
    setIsSelected(!isSelected);
    onSelect(!isSelected)
  };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <div
      style={{ margin, height: photo.height, width: photo.width, ...cont }}
      className={!isSelected ? "not-selected" : ""}
    >
      <Checkmark selected={isSelected ? true : false} />
      <Box
          bg="gray.300"
          //w={photo.width}
          h={photo.height}
          w="full"
          //roundedLeft={"xl"}
          shadow="md"
          bgSize="cover"
          bgPos="center"
          style={isSelected 
            ? { backgroundImage: `url(${metadata.image})`, ...imgStyle, ...selectedImgStyle } 
            : { backgroundImage: `url(${metadata.image})`, ...imgStyle }}
            onClick={handleOnClick}
        ></Box>
        <Box
          //w={{ base: 56, md: 64 }}
          w="full"
          bg={"transparent"}
          mt={-10}
          shadow="lg"
          overflow="hidden"
        >
          <chakra.h3
            bg={useColorModeValue("white", "gray.800")}
            opacity={0.7}
            py={2}
            textAlign="center"
            fontWeight="bold"
            textTransform="uppercase"
            color={useColorModeValue("gray.800", "white")}
            letterSpacing={1}
            _hover={{opacity:1}}
          >
            #{photo.deedId} {metadata.name}
          </chakra.h3>
        </Box>
      <style>{`.not-selected:hover{outline:2px solid rgba(255, 255, 255, 0.64)}`}</style>
    </div>
  )
}
import {
    BrainCircuit,
    BringToFront,
    Crop,
    Settings2,
  } from "lucide-react"

export const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      image: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Resize and Crop",
        icon: Crop,
        isActive: true,
        modalName: "resize",
        items: [
          {
            title: "Width",
            info: "This parameter specifies the width of the output image. It accepts an integer value greater than 1. If a value between 0 and 1 is specified, it acts as a percentage width. Therefore, 0.1 means 10% of the original width, 0.4 means 40% of the original width, and so on."
          },
          {
            title: "Height",
            info: "This parameter specifies the height of the output image. It accepts an integer value greater than 1. If a value between 0 and 1 is specified, the value acts as a percentage height. Therefore, 0.1 means 10% of the original height, 0.4 means 40% of the original height, and so on."
          },
          {
            title: "Aspect Ratio",
            info: "Used to specify the aspect ratio of the output image or the ratio of width to height of the output image. This parameter must be used along with either the height(h) or width(w) parameter."
          },
          {
            title: "Pad resize crop",
            info: "In the pad resize crop strategy, the output image's dimensions (height and width) are the same as requested, no cropping takes place, and the aspect ratio is preserved. This is accomplished by adding padding around the output image to match the exact dimension as requested."
          },
          {
            title: "Forced crop",
            info: "In a forced crop strategy, the output image's dimension (height and width) is exactly the same as requested. No cropping takes place, but the aspect ratio is not preserved. It forcefully squeezes the original image to fit it completely within the output dimensions."
          },
          {
            title: "Max-size crop",
            info: "In the max-size crop strategy, the whole image content is preserved (no cropping), and the aspect ratio is preserved, but one of the dimensions (height or width) is adjusted."
          },
          {
            title: "Max-size-enlarge crop",
            info: "This strategy is similar to the max-size cropping strategy, except it also allows an image to be enlarged beyond its original dimensions. The output image is less than or equal to the dimensions specified in the URL,i.e., at least one dimension will exactly match the output dimension requested, and the other dimension will be equal to or smaller than the corresponding output dimension requested."
          },
          {
            title: "Maintain ratio crop",
            info: "In this strategy, the output image's dimension (height and width) is the same as requested, and the aspect ratio is preserved. This is accomplished resizing the image to the requested dimension and in the process cropping parts from the original image."
          },
          {
            title: "Extract crop",
            info: "In this strategy, the output image's dimension (height and width) is exactly the same as requested, and the aspect ratio is preserved. Instead of trying to resize the image as we did in the maintain ratio strategy, we extract out a region of the requested dimension from the original image."
          },
          {
            title: "Pad extract crop",
            info: "The pad extract crop strategy is an extension of the extract crop strategy. In the extract crop strategy, we were extracting out a smaller area from a larger image. Now, there can be a scenario where the original image is small and we want to extract out a larger area (which is practically not possible without padding). So, the pad extract mode adds a solid colored padding around the image to match the exact size requested."
          },
          {
            title: "Focus",
            info: "This parameter can be used along with pad resize, maintain ratio, or extract crop to change the behavior of padding or cropping. Learn more from the different examples shown in respective sections."
          }
        ],
      },
      {
        title: "Add overlays",
        icon: BringToFront,
        isActive: false,
        modalName: "overlay",
        items: [
          {
            title: "Add text overlay",
            info: "Add any text string over a base image",
          },
          {
            title: "Add color blocks",
            info: "Add a solid color block over a base image",
          }
        ],
      },
      {
        title: "AI Transformations",
        icon: BrainCircuit,
        isActive: false,
        modalName: "ai",
        items: [
          {
            title: "Backgrond removal",
            info: "Remove the background from an image using the e-bgremove transformation parameter. Using e-bgremove is very cost efficient (around 1/10-th the price) compared to the e-removedotbg transformation."
          },
          {
            title: "Change background",
            info: "Easily transform the background of an image by providing a descriptive text prompt."
          },
          {
            title: "Edit image",
            info: "Modify the contents of an image using the e-edit transformation by providing a descriptive text prompt. The output image dimensions will be 1024x1024 if the input image is square. Otherwise, the output image dimensions will be one of 1536x1024 or 1024x1536, depending on which side is longer in the input image. "
          },
          {
            title: "AI drop shadow",
            info: "Add a drop shadow around an object in an image using the e-dropshadow transformation parameter. You can control the direction, elevation, and saturation of the light source."
          },
          {
            title: "Retouch",
            info: "Improve the quality of an image using the e-retouch transformation parameter. The input image's resolution must be less than 16 MP."
          },
          {
            title: "Upscale",
            info: "Increase the resolution of an image using the e-upscale transformation parameter. The input image's resolution must be less than 16 MP. The output image's resolution will be 16 MP."
          },
          {
            title: "Generative fill",
            info: "bg-genfill transformation extends an image beyond its original boundaries, allowing you to add new visual elements in an image while preserving the original image content."
          },
          {
            title: "Generative variation",
            info: "This will generate a new image with slight variations from the original image. The variations include changes in color, texture, and other visual elements. However, the model will try to preserve the structure and essence of the original image."
          },
          {
            title: "Face crop",
            info: "Crop an image based on the detected face using the fo-face transformation parameter. Optionally, zoom in or out using zoom transformation."
          },
          {
            title: "Object aware cropping",
            info: "We can also crop out a particular object of interest out of multiple different objects present in an image."
          },
          {
            title: "Smart crop",
            info: "Automatically focus on the most important part of an image using the fo-auto transformation parameter."
          }
        ],
      },
      {
        title: "Effects and Enhancements",
        url: "#opacity",
        icon: Settings2,
        modalName: "effect",
        items: [
          {
            title: "Contrast stretch",
            info: "It is used to automatically enhance the contrast of the image by using the full intensity values that a particular image format allows. This means that the lighter sections of an image become even lighter and the darker sections become even brighter, thereby enhancing the contrast."
          },
          {
            title: "Sharpen",
            info: "It is used to sharpen the input image. It is useful when highlighting the edges and finer details within an image."
          },
          {
            title: "Unsharp mask",
            info: "Unsharp Masking (USM) is an image sharpening technique. This transform allows you to apply and control unsharp masks on your images."
          },
          {
            title: "Gradient",
            info: "This is used to add a gradient overlay over an input image. The gradient formed is a linear gradient containing two colors, and it can be customized with the following parameters:"
          },
          {
            title: "Grayscale",
            info: "Used to turn an image into a grayscale version."
          },
          {
            title: "Blur",
            info: "Used to specify the Gaussian blur that must be applied to an image. The value of bl specifies the radius of the Gaussian Blur that is to be applied. Higher the value, the larger the radius of the Gaussian Blur. Possible values include integers between 1 and 100."
          },
          {
            title: "Border",
            info: "This adds a border to the image. It accepts two parameters - the width of the border and the color of the border."
          },
          {
            title: "Rotate",
            info: "It is used to specify the degree by which the output image must be rotated or specifies the use of EXIF Orientation Tag for the rotation of image using the auto parameter. Possible values - Any number for a clockwise rotation, or any number preceded with N for counter-clockwise rotation, and auto."
          },
          {
            title: "Flip",
            info: "It is used to flip/mirror an image horizontally, vertically, or in both directions. Possible values - h (horizontal), v (vertical), h_v (horizontal and vertical)"
          },
          {
            title: "Radius",
            info: "It is used to specify the radius that must be used to obtain a rounded output image. To obtain a perfectly rounded image, set the value to max . This parameter is applied after resizing the original image, if defined. Possible values - Positive Integer and max."
          },
          {
            title: "Opacity",
            info: "t is used to specify the opacity level of the output image. A non-transparent image can be made semi-transparent by specifying an opacity level that is less than 100. An already transparent image is made more transparent based on the specified value. It accepts numerical values ranging from 0 to 100, where 0 would produce a completely transparent image, and 100 would have no effect."
          }
        ],
      },
    ],
  }

export const fontData = {
  fonts: [
    {
      font: "AbrilFatFace",	
      italicAllowed: false,	
      boldAllowed: false,
    },
    {
      font: "Amaranth",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
    {
      font: "Arvo",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
    {
      font: "Audiowide",	
      italicAllowed: false,	
      boldAllowed: false,
    },
    {
      font: "Chivo",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
    {
      font: "Crimson Text",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
    {
      font: "exo",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
    {
      font: "Fredoka One",	
      italicAllowed: false,	
      boldAllowed: false,
    },
    {
      font: "Gravitas One",	
      italicAllowed: false,	
      boldAllowed: false,
    },
    {
      font: "Kanit",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
    {
      font: "Lato",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
    {
      font: "Lobster",	
      italicAllowed: false,	
      boldAllowed: false,
    },
    {
      font: "Lora",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
    {
      font: "Monoton",	
      italicAllowed: false,	
      boldAllowed: false,
    },
    {
      font: "Montserrat",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
    {
      font: "PT Mono",	
      italicAllowed: false,	
      boldAllowed: false,
    },
    {
      font: "PT_Serif",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
    {
      font: "Open Sans",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
    {
      font: "Roboto",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
    {
      font: "Old Standard",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
    {
      font: "Ubuntu",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
    {
      font: "Vollkorn",	
      italicAllowed: true,	
      boldAllowed: true,
      
    },
  ]
}
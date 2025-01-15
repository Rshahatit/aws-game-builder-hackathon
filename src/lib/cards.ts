import {
  Property,
  Money,
  Action,
  Rent,
  PropertyWildcard,
  PropertyColor,
} from "../types/game"

// Import AWS icons
import S3Icon from "react-aws-icons/dist/aws/logo/S3"
import GlacierIcon from "react-aws-icons/dist/aws/storage/GlacierVault"
import RDSIcon from "react-aws-icons/dist/aws/logo/RDS"
import DynamoDBIcon from "react-aws-icons/dist/aws/logo/DynamoDB"
import EC2Icon from "react-aws-icons/dist/aws/logo/EC2"
import ElasticBeanstalkIcon from "react-aws-icons/dist/aws/logo/ElasticBeanstalk"
import LambdaIcon from "react-aws-icons/dist/aws/logo/Lambda"
import ECSIcon from "react-aws-icons/dist/aws/logo/ECS"
import IAMIcon from "react-aws-icons/dist/aws/logo/IAM"
import CognitoIcon from "react-aws-icons/dist/aws/logo/Cognito"
import ShieldIcon from "react-aws-icons/dist/aws/logo/Shield"
import KinesisIcon from "react-aws-icons/dist/aws/logo/Kinesis"
import EMRIcon from "react-aws-icons/dist/aws/logo/EMR"
import RedshiftIcon from "react-aws-icons/dist/aws/logo/Redshift"
import SageMakerIcon from "react-aws-icons/dist/aws/logo/MachineLearning"
import RekognitionIcon from "react-aws-icons/dist/aws/logo/Rekognition"
import VPCIcon from "react-aws-icons/dist/aws/logo/VPC"
import Route53Icon from "react-aws-icons/dist/aws/logo/Route53"
import CloudFrontIcon from "react-aws-icons/dist/aws/logo/CloudFront"
import APIGatewayIcon from "react-aws-icons/dist/aws/logo/APIGateway"
import CloudWatchIcon from "react-aws-icons/dist/aws/logo/CloudWatch"
import CloudTrailIcon from "react-aws-icons/dist/aws/logo/CloudTrail"

// Property Cards
export const PROPERTIES: Record<string, Property> = {
  // Brown Properties (Basic Storage) - Entry level storage services
  s3_standard: {
    id: "s3_standard",
    type: "property",
    name: "S3 Standard",
    color: "brown",
    value: 1,
    count: 2,
    Icon: S3Icon,
  },
  s3_glacier: {
    id: "s3_glacier",
    type: "property",
    name: "S3 Glacier",
    color: "brown",
    value: 1,
    count: 2,
    Icon: GlacierIcon,
  },

  // Light Blue Properties (Database Services) - Basic data storage
  rds_mysql: {
    id: "rds_mysql",
    type: "property",
    name: "RDS MySQL",
    color: "lightBlue",
    value: 1,
    count: 2,
    Icon: RDSIcon,
  },
  aurora: {
    id: "aurora",
    type: "property",
    name: "Aurora",
    color: "lightBlue",
    value: 1,
    count: 2,
    Icon: RDSIcon,
  },
  dynamodb: {
    id: "dynamodb",
    type: "property",
    name: "DynamoDB",
    color: "lightBlue",
    value: 1,
    count: 2,
    Icon: DynamoDBIcon,
  },

  // Pink Properties (Compute Services) - Basic compute resources
  ec2_instances: {
    id: "ec2_instances",
    type: "property",
    name: "EC2 Instances",
    color: "pink",
    value: 2,
    count: 2,
    Icon: EC2Icon,
  },
  elastic_beanstalk: {
    id: "elastic_beanstalk",
    type: "property",
    name: "Elastic Beanstalk",
    color: "pink",
    value: 2,
    count: 2,
    Icon: ElasticBeanstalkIcon,
  },
  lambda: {
    id: "lambda",
    type: "property",
    name: "Lambda",
    color: "pink",
    value: 2,
    count: 2,
    Icon: LambdaIcon,
  },

  // Orange Properties (Container Services) - Container orchestration
  ecs: {
    id: "ecs",
    type: "property",
    name: "ECS",
    color: "orange",
    value: 2,
    count: 2,
    Icon: ECSIcon,
  },
  eks: {
    id: "eks",
    type: "property",
    name: "EKS",
    color: "orange",
    value: 2,
    count: 2,
    Icon: ECSIcon, // Using ECS icon as EKS isn't available
  },
  fargate: {
    id: "fargate",
    type: "property",
    name: "Fargate",
    color: "orange",
    value: 2,
    count: 2,
    Icon: ECSIcon, // Using ECS icon as Fargate isn't available
  },

  // Red Properties (Security Services) - Security and identity
  iam: {
    id: "iam",
    type: "property",
    name: "IAM",
    color: "red",
    value: 3,
    count: 2,
    Icon: IAMIcon,
  },
  cognito: {
    id: "cognito",
    type: "property",
    name: "Cognito",
    color: "red",
    value: 3,
    count: 2,
    Icon: CognitoIcon,
  },
  shield: {
    id: "shield",
    type: "property",
    name: "Shield",
    color: "red",
    value: 3,
    count: 2,
    Icon: ShieldIcon,
  },

  // Yellow Properties (Analytics Services) - Data processing
  kinesis: {
    id: "kinesis",
    type: "property",
    name: "Kinesis",
    color: "yellow",
    value: 3,
    count: 2,
    Icon: KinesisIcon,
  },
  emr: {
    id: "emr",
    type: "property",
    name: "EMR",
    color: "yellow",
    value: 3,
    count: 2,
    Icon: EMRIcon,
  },
  redshift: {
    id: "redshift",
    type: "property",
    name: "Redshift",
    color: "yellow",
    value: 3,
    count: 2,
    Icon: RedshiftIcon,
  },

  // Green Properties (AI/ML Services) - Machine learning
  sagemaker: {
    id: "sagemaker",
    type: "property",
    name: "SageMaker",
    color: "green",
    value: 4,
    count: 2,
    Icon: SageMakerIcon,
  },
  comprehend: {
    id: "comprehend",
    type: "property",
    name: "Comprehend",
    color: "green",
    value: 4,
    count: 2,
    Icon: SageMakerIcon, // Using ML icon as Comprehend isn't available
  },
  rekognition: {
    id: "rekognition",
    type: "property",
    name: "Rekognition",
    color: "green",
    value: 4,
    count: 2,
    Icon: RekognitionIcon,
  },

  // Blue Properties (Enterprise Services) - Premium enterprise services
  outposts: {
    id: "outposts",
    type: "property",
    name: "Outposts",
    color: "blue",
    value: 4,
    count: 2,
    Icon: EC2Icon, // Using EC2 icon as Outposts isn't available
  },
  wavelength: {
    id: "wavelength",
    type: "property",
    name: "Wavelength",
    color: "blue",
    value: 4,
    count: 2,
    Icon: EC2Icon, // Using EC2 icon as Wavelength isn't available
  },

  // Railroad Properties (Networking Services) - Connection services
  vpc: {
    id: "vpc",
    type: "property",
    name: "VPC",
    color: "railroad",
    value: 2,
    count: 1,
    Icon: VPCIcon,
  },
  route53: {
    id: "route53",
    type: "property",
    name: "Route 53",
    color: "railroad",
    value: 2,
    count: 1,
    Icon: Route53Icon,
  },
  cloudfront: {
    id: "cloudfront",
    type: "property",
    name: "CloudFront",
    color: "railroad",
    value: 2,
    count: 1,
    Icon: CloudFrontIcon,
  },
  api_gateway: {
    id: "api_gateway",
    type: "property",
    name: "API Gateway",
    color: "railroad",
    value: 2,
    count: 1,
    Icon: APIGatewayIcon,
  },

  // Utility Properties (Monitoring Services) - Essential monitoring tools
  cloudwatch: {
    id: "cloudwatch",
    type: "property",
    name: "CloudWatch",
    color: "utility",
    value: 2,
    count: 1,
    Icon: CloudWatchIcon,
  },
  cloudtrail: {
    id: "cloudtrail",
    type: "property",
    name: "CloudTrail",
    color: "utility",
    value: 2,
    count: 1,
    Icon: CloudTrailIcon,
  },
}
// Property Set Requirements
export const PROPERTY_SETS = {
  brown: { name: "Brown", count: 2, rentValues: [1, 2, 3] },
  lightBlue: { name: "Light Blue", count: 3, rentValues: [1, 2, 3] },
  pink: { name: "Pink", count: 3, rentValues: [2, 4, 6] },
  orange: { name: "Orange", count: 3, rentValues: [2, 4, 6] },
  red: { name: "Red", count: 3, rentValues: [3, 6, 8] },
  yellow: { name: "Yellow", count: 3, rentValues: [3, 6, 8] },
  green: { name: "Green", count: 3, rentValues: [4, 7, 9] },
  blue: { name: "Blue", count: 2, rentValues: [4, 8, 10] },
  railroad: { name: "Railroad", count: 4, rentValues: [1, 2, 3, 4] },
  utility: { name: "Utility", count: 2, rentValues: [1, 2] },
} as const

export const PROPERTY_COLORS: Record<
  PropertyColor,
  { name: string; hex: string }
> = {
  brown: { name: "Brown", hex: "#8B4513" },
  blue: { name: "Blue", hex: "#0000FF" },
  green: { name: "Green", hex: "#008000" },
  yellow: { name: "Yellow", hex: "#FFD700" },
  red: { name: "Red", hex: "#FF0000" },
  orange: { name: "Orange", hex: "#FFA500" },
  pink: { name: "Pink", hex: "#FFC0CB" },
  lightBlue: { name: "Light Blue", hex: "#87CEEB" },
  railroad: { name: "Railroad", hex: "#000000" },
  utility: { name: "Utility", hex: "#808080" },
}

// Money Cards
export const MONEY: Record<string, Money> = {
  m1: { id: "m1", type: "money", name: "1M", value: 1, count: 6 },
  m2: { id: "m2", type: "money", name: "2M", value: 2, count: 5 },
  m3: { id: "m3", type: "money", name: "3M", value: 3, count: 3 },
  m4: { id: "m4", type: "money", name: "4M", value: 4, count: 3 },
  m5: { id: "m5", type: "money", name: "5M", value: 5, count: 2 },
  m10: { id: "m10", type: "money", name: "10M", value: 10, count: 1 },
}

// Action Cards
export const ACTIONS: Record<string, Action> = {
  deal_breaker: {
    id: "deal_breaker",
    type: "action",
    name: "Deal Breaker",
    description: "Steal a complete set of properties from any player",
    value: 5,
    count: 2,
  },
  just_say_no: {
    id: "just_say_no",
    type: "action",
    name: "Just Say No",
    description: "Use to cancel any action card played against you",
    value: 4,
    count: 3,
  },
  sly_deal: {
    id: "sly_deal",
    type: "action",
    name: "Sly Deal",
    description:
      "Steal a property from the player of your choice (cannot be part of a complete set)",
    value: 3,
    count: 3,
  },
  forced_deal: {
    id: "forced_deal",
    type: "action",
    name: "Forced Deal",
    description:
      "Swap any property with another player (cannot be part of a complete set)",
    value: 3,
    count: 3,
  },
  debt_collector: {
    id: "debt_collector",
    type: "action",
    name: "Debt Collector",
    description: "Force any player to pay you M5",
    value: 3,
    count: 3,
  },
  its_my_birthday: {
    id: "its_my_birthday",
    type: "action",
    name: "It's My Birthday",
    description: "All players must pay you M2",
    value: 2,
    count: 3,
  },
  double_rent: {
    id: "double_rent",
    type: "action",
    name: "Double The Rent",
    description: "Play with a rent card to double the rent value",
    value: 1,
    count: 2,
  },
  house: {
    id: "house",
    type: "action",
    name: "House",
    description: "Add M3 to rent value of a complete set",
    value: 3,
    count: 3,
  },
  hotel: {
    id: "hotel",
    type: "action",
    name: "Hotel",
    description: "Add M4 to rent value of a complete set (requires house)",
    value: 4,
    count: 2,
  },
  pass_go: {
    id: "pass_go",
    type: "action",
    name: "Pass Go",
    description: "Draw 2 extra cards",
    value: 1,
    count: 10,
  },
}

// Rent Cards
export const RENT: Record<string, Rent> = {
  rent_brown_lightblue: {
    id: "rent_brown_lightblue",
    type: "rent",
    name: "Rent",
    colors: ["brown", "lightBlue"],
    value: 1,
    count: 2,
  },
  rent_pink_orange: {
    id: "rent_pink_orange",
    type: "rent",
    name: "Rent",
    colors: ["pink", "orange"],
    value: 1,
    count: 2,
  },
  rent_red_yellow: {
    id: "rent_red_yellow",
    type: "rent",
    name: "Rent",
    colors: ["red", "yellow"],
    value: 1,
    count: 2,
  },
  rent_green_blue: {
    id: "rent_green_blue",
    type: "rent",
    name: "Rent",
    colors: ["green", "blue"],
    value: 1,
    count: 2,
  },
  rent_railroad_utility: {
    id: "rent_railroad_utility",
    type: "rent",
    name: "Rent",
    colors: ["railroad", "utility"],
    value: 1,
    count: 2,
  },
  rent_wild: {
    id: "rent_wild",
    type: "rent",
    name: "Rent (Wild)",
    colors: "all",
    value: 3,
    count: 3,
  },
}

// Property Wildcards
export const PROPERTY_WILDCARDS: Record<string, PropertyWildcard> = {
  wild_brown_lightblue: {
    id: "wild_brown_lightblue",
    type: "property_wildcard",
    name: "Property Wild Card",
    colors: ["brown", "lightBlue"],
    count: 1,
    value: 0,
  },
  wild_pink_orange: {
    id: "wild_pink_orange",
    type: "property_wildcard",
    name: "Property Wild Card",
    colors: ["pink", "orange"],
    count: 2,
    value: 2,
  },
  wild_red_yellow: {
    id: "wild_red_yellow",
    type: "property_wildcard",
    name: "Property Wild Card",
    colors: ["red", "yellow"],
    count: 2,
    value: 2,
  },
  wild_green_blue: {
    id: "wild_green_blue",
    type: "property_wildcard",
    name: "Property Wild Card",
    colors: ["green", "blue"],
    count: 1,
    value: 2,
  },
  wild_green_railroad: {
    id: "wild_green_railroad",
    type: "property_wildcard",
    name: "Property Wild Card",
    colors: ["green", "railroad"],
    count: 1,
    value: 2,
  },
  wild_lightblue_railroad: {
    id: "wild_lightblue_railroad",
    type: "property_wildcard",
    name: "Property Wild Card",
    colors: ["lightBlue", "railroad"],
    count: 1,
    value: 2,
  },
  wild_railroad_utility: {
    id: "wild_railroad_utility",
    type: "property_wildcard",
    name: "Property Wild Card",
    colors: ["railroad", "utility"],
    count: 1,
    value: 2,
  },
  wild_all: {
    id: "wild_all",
    type: "property_wildcard",
    name: "Property Wild Card (All)",
    colors: "all",
    count: 2,
    value: 2,
  },
}

// Helper functions for deck management
export const getAllCards = () => ({
  ...PROPERTIES,
  ...MONEY,
  ...ACTIONS,
  ...RENT,
  ...PROPERTY_WILDCARDS,
})

export const createDeck = () => {
  const deck: string[] = []
  const allCards = getAllCards()

  // Add cards to deck based on their count
  Object.values(allCards).forEach((card) => {
    for (let i = 0; i < card.count; i++) {
      deck.push(card.id)
    }
  })

  return shuffle(deck)
}

// Fisher-Yates shuffle algorithm
const shuffle = (array: string[]): string[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Helper function to get card details by ID
export const getCardById = (cardId: string) => {
  const allCards = getAllCards()
  return allCards[cardId]
}

// Helper function to check if a property set is complete
export const isSetComplete = (
  properties: string[],
  color: PropertyColor
): boolean => {
  const requiredCount = PROPERTY_SETS[color].count
  const colorProperties = properties.filter((propId) => {
    const card = getCardById(propId)
    return card?.type === "property" && card.color === color
  })

  // Count wildcards that can be used for this color
  const wildcards = properties.filter((propId) => {
    const card = getCardById(propId)
    return (
      card?.type === "property_wildcard" &&
      (card.colors === "all" ||
        (Array.isArray(card.colors) && card.colors.includes(color)))
    )
  })

  return colorProperties.length + wildcards.length >= requiredCount
}

// Helper function to calculate rent for a property set
export const calculateRent = (
  properties: string[],
  color: PropertyColor,
  hasHouse: boolean = false,
  hasHotel: boolean = false
): number => {
  const set = PROPERTY_SETS[color]
  const propertyCount = properties.filter((propId) => {
    const card = getCardById(propId)
    return card?.type === "property" && card.color === color
  }).length

  const rentIndex = Math.min(propertyCount - 1, set.rentValues.length - 1)
  let rent = set.rentValues[rentIndex] || 0

  // Add house and hotel values if applicable
  if (hasHouse) rent += 3
  if (hasHotel && hasHouse) rent += 4

  return rent
}

export const cardDefinitions = {
  getAllCards,
  createDeck,
  getCardById,
  isSetComplete,
  calculateRent,
}
// // Property Cards
// export const PROPERTIES: Record<string, Property> = {
//   // Brown Properties (2 each)
//   mediterranean_avenue: {
//     id: "mediterranean_avenue",
//     type: "property",
//     name: "Mediterranean Avenue",
//     color: "brown",
//     value: 1,
//     count: 2,
//   },
//   baltic_avenue: {
//     id: "baltic_avenue",
//     type: "property",
//     name: "Baltic Avenue",
//     color: "brown",
//     value: 1,
//     count: 2,
//   },

//   // Light Blue Properties (3 each)
//   oriental_avenue: {
//     id: "oriental_avenue",
//     type: "property",
//     name: "Oriental Avenue",
//     color: "lightBlue",
//     value: 1,
//     count: 2,
//   },
//   vermont_avenue: {
//     id: "vermont_avenue",
//     type: "property",
//     name: "Vermont Avenue",
//     color: "lightBlue",
//     value: 1,
//     count: 2,
//   },
//   connecticut_avenue: {
//     id: "connecticut_avenue",
//     type: "property",
//     name: "Connecticut Avenue",
//     color: "lightBlue",
//     value: 1,
//     count: 2,
//   },

//   // Pink Properties (3 each)
//   st_charles_place: {
//     id: "st_charles_place",
//     type: "property",
//     name: "St. Charles Place",
//     color: "pink",
//     value: 2,
//     count: 2,
//   },
//   states_avenue: {
//     id: "states_avenue",
//     type: "property",
//     name: "States Avenue",
//     color: "pink",
//     value: 2,
//     count: 2,
//   },
//   virginia_avenue: {
//     id: "virginia_avenue",
//     type: "property",
//     name: "Virginia Avenue",
//     color: "pink",
//     value: 2,
//     count: 2,
//   },

//   // Orange Properties (3 each)
//   st_james_place: {
//     id: "st_james_place",
//     type: "property",
//     name: "St. James Place",
//     color: "orange",
//     value: 2,
//     count: 2,
//   },
//   tennessee_avenue: {
//     id: "tennessee_avenue",
//     type: "property",
//     name: "Tennessee Avenue",
//     color: "orange",
//     value: 2,
//     count: 2,
//   },
//   new_york_avenue: {
//     id: "new_york_avenue",
//     type: "property",
//     name: "New York Avenue",
//     color: "orange",
//     value: 2,
//     count: 2,
//   },

//   // Red Properties (3 each)
//   kentucky_avenue: {
//     id: "kentucky_avenue",
//     type: "property",
//     name: "Kentucky Avenue",
//     color: "red",
//     value: 3,
//     count: 2,
//   },
//   indiana_avenue: {
//     id: "indiana_avenue",
//     type: "property",
//     name: "Indiana Avenue",
//     color: "red",
//     value: 3,
//     count: 2,
//   },
//   illinois_avenue: {
//     id: "illinois_avenue",
//     type: "property",
//     name: "Illinois Avenue",
//     color: "red",
//     value: 3,
//     count: 2,
//   },

//   // Yellow Properties (3 each)
//   atlantic_avenue: {
//     id: "atlantic_avenue",
//     type: "property",
//     name: "Atlantic Avenue",
//     color: "yellow",
//     value: 3,
//     count: 2,
//   },
//   ventnor_avenue: {
//     id: "ventnor_avenue",
//     type: "property",
//     name: "Ventnor Avenue",
//     color: "yellow",
//     value: 3,
//     count: 2,
//   },
//   marvin_gardens: {
//     id: "marvin_gardens",
//     type: "property",
//     name: "Marvin Gardens",
//     color: "yellow",
//     value: 3,
//     count: 2,
//   },

//   // Green Properties (3 each)
//   pacific_avenue: {
//     id: "pacific_avenue",
//     type: "property",
//     name: "Pacific Avenue",
//     color: "green",
//     value: 4,
//     count: 2,
//   },
//   north_carolina_avenue: {
//     id: "north_carolina_avenue",
//     type: "property",
//     name: "North Carolina Avenue",
//     color: "green",
//     value: 4,
//     count: 2,
//   },
//   pennsylvania_avenue: {
//     id: "pennsylvania_avenue",
//     type: "property",
//     name: "Pennsylvania Avenue",
//     color: "green",
//     value: 4,
//     count: 2,
//   },

//   // Blue Properties (2 each)
//   park_place: {
//     id: "park_place",
//     type: "property",
//     name: "Park Place",
//     color: "blue",
//     value: 4,
//     count: 2,
//   },
//   boardwalk: {
//     id: "boardwalk",
//     type: "property",
//     name: "Boardwalk",
//     color: "blue",
//     value: 4,
//     count: 2,
//   },

//   // Railroad Properties (4 total)
//   reading_railroad: {
//     id: "reading_railroad",
//     type: "property",
//     name: "Reading Railroad",
//     color: "railroad",
//     value: 2,
//     count: 1,
//   },
//   pennsylvania_railroad: {
//     id: "pennsylvania_railroad",
//     type: "property",
//     name: "Pennsylvania Railroad",
//     color: "railroad",
//     value: 2,
//     count: 1,
//   },
//   b_and_o_railroad: {
//     id: "b_and_o_railroad",
//     type: "property",
//     name: "B. & O. Railroad",
//     color: "railroad",
//     value: 2,
//     count: 1,
//   },
//   short_line: {
//     id: "short_line",
//     type: "property",
//     name: "Short Line",
//     color: "railroad",
//     value: 2,
//     count: 1,
//   },

//   // Utility Properties (2 total)
//   electric_company: {
//     id: "electric_company",
//     type: "property",
//     name: "Electric Company",
//     color: "utility",
//     value: 2,
//     count: 1,
//   },
//   water_works: {
//     id: "water_works",
//     type: "property",
//     name: "Water Works",
//     color: "utility",
//     value: 2,
//     count: 1,
//   },
// }

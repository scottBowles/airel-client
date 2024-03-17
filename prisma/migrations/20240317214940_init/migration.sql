-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_staff" BOOLEAN NOT NULL DEFAULT false,
    "is_superuser" BOOLEAN NOT NULL DEFAULT false,
    "date_joined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDM" BOOLEAN NOT NULL DEFAULT false,
    "last_activity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alias" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Alias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameLog" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "googleId" TEXT,
    "googleCreatedTime" TIMESTAMP(3),
    "gameDate" TIMESTAMP(3),
    "brief" TEXT,
    "synopsis" TEXT,
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lockUserId" INTEGER,
    "lockTime" TIMESTAMP(3),

    CONSTRAINT "GameLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiLogSuggestion" (
    "id" SERIAL NOT NULL,
    "logId" INTEGER NOT NULL,
    "title" TEXT,
    "brief" TEXT,
    "synopsis" TEXT,
    "associations" TEXT[],
    "characters" TEXT[],
    "items" TEXT[],
    "places" TEXT[],
    "races" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiLogSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Association" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "thumbnailId" TEXT,
    "lockUserId" INTEGER,
    "lockTime" TIMESTAMP(3),

    CONSTRAINT "Association_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "raceId" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proficiency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "proficiencyType" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Proficiency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artifact" (
    "id" SERIAL NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArmorTraits" (
    "id" SERIAL NOT NULL,
    "acBonus" INTEGER NOT NULL DEFAULT 0,
    "itemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArmorTraits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeaponTraits" (
    "id" SERIAL NOT NULL,
    "attackBonus" INTEGER NOT NULL DEFAULT 0,
    "itemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeaponTraits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentTraits" (
    "id" SERIAL NOT NULL,
    "briefDescription" TEXT,
    "itemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipmentTraits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Export" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Export_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceExport" (
    "id" SERIAL NOT NULL,
    "placeId" INTEGER NOT NULL,
    "exportId" INTEGER NOT NULL,
    "significance" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlaceExport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceRace" (
    "id" SERIAL NOT NULL,
    "raceId" INTEGER NOT NULL,
    "placeId" INTEGER NOT NULL,
    "percent" DOUBLE PRECISION NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlaceRace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceAssociation" (
    "id" SERIAL NOT NULL,
    "placeId" INTEGER NOT NULL,
    "associationId" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlaceAssociation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "placeType" TEXT,
    "parentId" INTEGER,
    "population" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AliasToAssociation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GameLogToPlace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AssociationToGameLog" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterAssociation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedAssociation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedAssociationCharacter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedAssociationItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedAssociationPlace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedAssociationRace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterFeature" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToProficiency" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedCharacter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedCharacterItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedCharacterPlace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedCharacterRace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedItemPlace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedItemRace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ArtifactItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedArtifact" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedArtifactAssociation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedArtifactCharacter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedArtifactItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedArtifactPlace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedArtifactRace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedPlace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedPlaceRace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedRace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GameLog_url_key" ON "GameLog"("url");

-- CreateIndex
CREATE UNIQUE INDEX "GameLog_googleId_key" ON "GameLog"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_name_key" ON "Feature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ArmorTraits_itemId_key" ON "ArmorTraits"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "WeaponTraits_itemId_key" ON "WeaponTraits"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentTraits_itemId_key" ON "EquipmentTraits"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "_AliasToAssociation_AB_unique" ON "_AliasToAssociation"("A", "B");

-- CreateIndex
CREATE INDEX "_AliasToAssociation_B_index" ON "_AliasToAssociation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameLogToPlace_AB_unique" ON "_GameLogToPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_GameLogToPlace_B_index" ON "_GameLogToPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AssociationToGameLog_AB_unique" ON "_AssociationToGameLog"("A", "B");

-- CreateIndex
CREATE INDEX "_AssociationToGameLog_B_index" ON "_AssociationToGameLog"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterAssociation_AB_unique" ON "_CharacterAssociation"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterAssociation_B_index" ON "_CharacterAssociation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedAssociation_AB_unique" ON "_RelatedAssociation"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedAssociation_B_index" ON "_RelatedAssociation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedAssociationCharacter_AB_unique" ON "_RelatedAssociationCharacter"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedAssociationCharacter_B_index" ON "_RelatedAssociationCharacter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedAssociationItem_AB_unique" ON "_RelatedAssociationItem"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedAssociationItem_B_index" ON "_RelatedAssociationItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedAssociationPlace_AB_unique" ON "_RelatedAssociationPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedAssociationPlace_B_index" ON "_RelatedAssociationPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedAssociationRace_AB_unique" ON "_RelatedAssociationRace"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedAssociationRace_B_index" ON "_RelatedAssociationRace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterFeature_AB_unique" ON "_CharacterFeature"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterFeature_B_index" ON "_CharacterFeature"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToProficiency_AB_unique" ON "_CharacterToProficiency"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToProficiency_B_index" ON "_CharacterToProficiency"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedCharacter_AB_unique" ON "_RelatedCharacter"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedCharacter_B_index" ON "_RelatedCharacter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedCharacterItem_AB_unique" ON "_RelatedCharacterItem"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedCharacterItem_B_index" ON "_RelatedCharacterItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedCharacterPlace_AB_unique" ON "_RelatedCharacterPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedCharacterPlace_B_index" ON "_RelatedCharacterPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedCharacterRace_AB_unique" ON "_RelatedCharacterRace"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedCharacterRace_B_index" ON "_RelatedCharacterRace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedItem_AB_unique" ON "_RelatedItem"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedItem_B_index" ON "_RelatedItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedItemPlace_AB_unique" ON "_RelatedItemPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedItemPlace_B_index" ON "_RelatedItemPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedItemRace_AB_unique" ON "_RelatedItemRace"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedItemRace_B_index" ON "_RelatedItemRace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtifactItem_AB_unique" ON "_ArtifactItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtifactItem_B_index" ON "_ArtifactItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedArtifact_AB_unique" ON "_RelatedArtifact"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedArtifact_B_index" ON "_RelatedArtifact"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedArtifactAssociation_AB_unique" ON "_RelatedArtifactAssociation"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedArtifactAssociation_B_index" ON "_RelatedArtifactAssociation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedArtifactCharacter_AB_unique" ON "_RelatedArtifactCharacter"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedArtifactCharacter_B_index" ON "_RelatedArtifactCharacter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedArtifactItem_AB_unique" ON "_RelatedArtifactItem"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedArtifactItem_B_index" ON "_RelatedArtifactItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedArtifactPlace_AB_unique" ON "_RelatedArtifactPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedArtifactPlace_B_index" ON "_RelatedArtifactPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedArtifactRace_AB_unique" ON "_RelatedArtifactRace"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedArtifactRace_B_index" ON "_RelatedArtifactRace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedPlace_AB_unique" ON "_RelatedPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedPlace_B_index" ON "_RelatedPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedPlaceRace_AB_unique" ON "_RelatedPlaceRace"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedPlaceRace_B_index" ON "_RelatedPlaceRace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedRace_AB_unique" ON "_RelatedRace"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedRace_B_index" ON "_RelatedRace"("B");

-- AddForeignKey
ALTER TABLE "GameLog" ADD CONSTRAINT "GameLog_lockUserId_fkey" FOREIGN KEY ("lockUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiLogSuggestion" ADD CONSTRAINT "AiLogSuggestion_logId_fkey" FOREIGN KEY ("logId") REFERENCES "GameLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Association" ADD CONSTRAINT "Association_lockUserId_fkey" FOREIGN KEY ("lockUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArmorTraits" ADD CONSTRAINT "ArmorTraits_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponTraits" ADD CONSTRAINT "WeaponTraits_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentTraits" ADD CONSTRAINT "EquipmentTraits_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceExport" ADD CONSTRAINT "PlaceExport_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceExport" ADD CONSTRAINT "PlaceExport_exportId_fkey" FOREIGN KEY ("exportId") REFERENCES "Export"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceRace" ADD CONSTRAINT "PlaceRace_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceRace" ADD CONSTRAINT "PlaceRace_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceAssociation" ADD CONSTRAINT "PlaceAssociation_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceAssociation" ADD CONSTRAINT "PlaceAssociation_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AliasToAssociation" ADD CONSTRAINT "_AliasToAssociation_A_fkey" FOREIGN KEY ("A") REFERENCES "Alias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AliasToAssociation" ADD CONSTRAINT "_AliasToAssociation_B_fkey" FOREIGN KEY ("B") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameLogToPlace" ADD CONSTRAINT "_GameLogToPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "GameLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameLogToPlace" ADD CONSTRAINT "_GameLogToPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssociationToGameLog" ADD CONSTRAINT "_AssociationToGameLog_A_fkey" FOREIGN KEY ("A") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssociationToGameLog" ADD CONSTRAINT "_AssociationToGameLog_B_fkey" FOREIGN KEY ("B") REFERENCES "GameLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterAssociation" ADD CONSTRAINT "_CharacterAssociation_A_fkey" FOREIGN KEY ("A") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterAssociation" ADD CONSTRAINT "_CharacterAssociation_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedAssociation" ADD CONSTRAINT "_RelatedAssociation_A_fkey" FOREIGN KEY ("A") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedAssociation" ADD CONSTRAINT "_RelatedAssociation_B_fkey" FOREIGN KEY ("B") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedAssociationCharacter" ADD CONSTRAINT "_RelatedAssociationCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedAssociationCharacter" ADD CONSTRAINT "_RelatedAssociationCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedAssociationItem" ADD CONSTRAINT "_RelatedAssociationItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedAssociationItem" ADD CONSTRAINT "_RelatedAssociationItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedAssociationPlace" ADD CONSTRAINT "_RelatedAssociationPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedAssociationPlace" ADD CONSTRAINT "_RelatedAssociationPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedAssociationRace" ADD CONSTRAINT "_RelatedAssociationRace_A_fkey" FOREIGN KEY ("A") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedAssociationRace" ADD CONSTRAINT "_RelatedAssociationRace_B_fkey" FOREIGN KEY ("B") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterFeature" ADD CONSTRAINT "_CharacterFeature_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterFeature" ADD CONSTRAINT "_CharacterFeature_B_fkey" FOREIGN KEY ("B") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToProficiency" ADD CONSTRAINT "_CharacterToProficiency_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToProficiency" ADD CONSTRAINT "_CharacterToProficiency_B_fkey" FOREIGN KEY ("B") REFERENCES "Proficiency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedCharacter" ADD CONSTRAINT "_RelatedCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedCharacter" ADD CONSTRAINT "_RelatedCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedCharacterItem" ADD CONSTRAINT "_RelatedCharacterItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedCharacterItem" ADD CONSTRAINT "_RelatedCharacterItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedCharacterPlace" ADD CONSTRAINT "_RelatedCharacterPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedCharacterPlace" ADD CONSTRAINT "_RelatedCharacterPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedCharacterRace" ADD CONSTRAINT "_RelatedCharacterRace_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedCharacterRace" ADD CONSTRAINT "_RelatedCharacterRace_B_fkey" FOREIGN KEY ("B") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedItem" ADD CONSTRAINT "_RelatedItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedItem" ADD CONSTRAINT "_RelatedItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedItemPlace" ADD CONSTRAINT "_RelatedItemPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedItemPlace" ADD CONSTRAINT "_RelatedItemPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedItemRace" ADD CONSTRAINT "_RelatedItemRace_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedItemRace" ADD CONSTRAINT "_RelatedItemRace_B_fkey" FOREIGN KEY ("B") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtifactItem" ADD CONSTRAINT "_ArtifactItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Artifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtifactItem" ADD CONSTRAINT "_ArtifactItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedArtifact" ADD CONSTRAINT "_RelatedArtifact_A_fkey" FOREIGN KEY ("A") REFERENCES "Artifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedArtifact" ADD CONSTRAINT "_RelatedArtifact_B_fkey" FOREIGN KEY ("B") REFERENCES "Artifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedArtifactAssociation" ADD CONSTRAINT "_RelatedArtifactAssociation_A_fkey" FOREIGN KEY ("A") REFERENCES "Artifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedArtifactAssociation" ADD CONSTRAINT "_RelatedArtifactAssociation_B_fkey" FOREIGN KEY ("B") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedArtifactCharacter" ADD CONSTRAINT "_RelatedArtifactCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "Artifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedArtifactCharacter" ADD CONSTRAINT "_RelatedArtifactCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedArtifactItem" ADD CONSTRAINT "_RelatedArtifactItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Artifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedArtifactItem" ADD CONSTRAINT "_RelatedArtifactItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedArtifactPlace" ADD CONSTRAINT "_RelatedArtifactPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "Artifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedArtifactPlace" ADD CONSTRAINT "_RelatedArtifactPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedArtifactRace" ADD CONSTRAINT "_RelatedArtifactRace_A_fkey" FOREIGN KEY ("A") REFERENCES "Artifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedArtifactRace" ADD CONSTRAINT "_RelatedArtifactRace_B_fkey" FOREIGN KEY ("B") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedPlace" ADD CONSTRAINT "_RelatedPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedPlace" ADD CONSTRAINT "_RelatedPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedPlaceRace" ADD CONSTRAINT "_RelatedPlaceRace_A_fkey" FOREIGN KEY ("A") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedPlaceRace" ADD CONSTRAINT "_RelatedPlaceRace_B_fkey" FOREIGN KEY ("B") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedRace" ADD CONSTRAINT "_RelatedRace_A_fkey" FOREIGN KEY ("A") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedRace" ADD CONSTRAINT "_RelatedRace_B_fkey" FOREIGN KEY ("B") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

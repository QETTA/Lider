-- CreateTable
CREATE TABLE "user_onboarding_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT,
    "roleContext" TEXT,
    "centerType" TEXT,
    "teamSize" TEXT,
    "onboardingGoals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "setupPriorities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "communicationChannel" TEXT,
    "handoverNote" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_onboarding_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_onboarding_profiles_userId_key" ON "user_onboarding_profiles"("userId");

-- AddForeignKey
ALTER TABLE "user_onboarding_profiles"
ADD CONSTRAINT "user_onboarding_profiles_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

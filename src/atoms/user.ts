import { IUser } from "@/interfaces/user";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage<IUser | null>("user", null);

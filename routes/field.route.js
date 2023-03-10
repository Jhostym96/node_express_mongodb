import { Router } from "express";
import {
  createField,
  getField,
  getFields,
  removeField,
  updateField,
} from "../controllers/field.controllers.js";
import { requireToken } from "../middlewares/requireToken.js";
import { isAdmin } from "../middlewares/validateRol.js";

const router = Router();

router.get("/", requireToken, getFields);
router.get("/:id", requireToken, getField);
router.post("/", requireToken, isAdmin, createField);
router.delete("/:id", requireToken, removeField);
router.patch("/:id", requireToken, updateField);

export default router;

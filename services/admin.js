import db from '../db/setup';
import { getAdminByEmail, insertNewApplication, getBatchId } from '../db/queries/admin';

export const getSingleAdminByEmail = async (email) => db.oneOrNone(getAdminByEmail, [email]);

export const setNewApplication = async (data) => {
  const {
    batchId, applicationLink, closureDate, instructions,
  } = data;
  return db.none(insertNewApplication, [batchId, applicationLink, closureDate, instructions]);
};

export const checkBatchId = async (batchId) => db.oneOrNone(getBatchId, [batchId]);

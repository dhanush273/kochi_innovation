import { isMongoActive } from '../db.js';
import Registration from '../models/Registration.js';
import DeletedRegistration from '../models/DeletedRegistration.js';
import AttendeePost from '../models/AttendeePost.js';
import EventContent from '../models/EventContent.js';
import { localStore, defaultEventData } from '../storage.js';


export const dataService = {
  async getEventContent() {
    if (isMongoActive()) {
      try {
        let content = await EventContent.findOne({ key: 'main_event' });
        if (!content) {
          content = await EventContent.create({ key: 'main_event', data: defaultEventData });
        }
        return content.data;
      } catch (err) {
        console.error('MongoDB getEventContent error, falling back:', err.message);
      }
    }
    return localStore.getEventData();
  },

  async updateEventContent(newData) {
    if (isMongoActive()) {
      try {
        const updated = await EventContent.findOneAndUpdate(
          { key: 'main_event' },
          { data: newData },
          { new: true, upsert: true }
        );
        return updated.data;
      } catch (err) {
        console.error('MongoDB updateEventContent error, falling back:', err.message);
      }
    }
    return localStore.saveEventData(newData);
  },

  async createRegistration(regData) {
    if (isMongoActive()) {
      try {
        const record = await Registration.create(regData);
        return record.toObject();
      } catch (err) {
        console.error('MongoDB createRegistration error, falling back:', err.message);
      }
    }
    return localStore.addRegistration(regData);
  },

  async getAllRegistrations() {
    if (isMongoActive()) {
      try {
        const records = await Registration.find().sort({ createdAt: -1 }).lean();
        return records;
      } catch (err) {
        console.error('MongoDB getAllRegistrations error, falling back:', err.message);
      }
    }
    return localStore.getRegistrations();
  },

  async updateRegistrationStatus(id, status) {
    if (isMongoActive()) {
      try {
        const record = await Registration.findByIdAndUpdate(id, { status }, { new: true }).lean();
        if (record) return record;
      } catch (err) {
        console.error('MongoDB updateRegistrationStatus error, falling back:', err.message);
      }
    }
    return localStore.updateRegistrationStatus(id, status);
  },

  async getRegistrationById(id) {
    if (isMongoActive()) {
      try {
        let record = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          record = await Registration.findById(id).lean();
        }
        if (!record) {
          record = await Registration.findOne({ qrCodeToken: id }).lean();
        }
        if (record) return record;
      } catch (err) {
        console.error('MongoDB getRegistrationById error, falling back:', err.message);
      }
    }
    return localStore.getRegistrationById(id);
  },

  async updateRegistration(id, updateData) {
    if (isMongoActive()) {
      try {
        let record = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          record = await Registration.findByIdAndUpdate(id, updateData, { new: true }).lean();
        } else {
          record = await Registration.findOneAndUpdate({ qrCodeToken: id }, updateData, { new: true }).lean();
        }
        if (record) return record;
      } catch (err) {
        console.error('MongoDB updateRegistration error, falling back:', err.message);
      }
    }
    return localStore.updateRegistration(id, updateData);
  },

  async markAttended(id) {
    const now = new Date().toISOString();
    return this.updateRegistration(id, {
      status: 'Attended',
      attendedAt: now
    });
  },

  async markEmailSent(id) {
    const now = new Date().toISOString();
    return this.updateRegistration(id, {
      emailSent: true,
      emailSentAt: now
    });
  },

  async deleteRegistration(id, deletedBy = 'Admin', reason = '') {
    if (isMongoActive()) {
      try {
        let record = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          record = await Registration.findById(id);
        } else {
          record = await Registration.findOne({ qrCodeToken: id });
        }

        if (record) {
          const regObj = record.toObject ? record.toObject() : record;
          const { _id, createdAt, updatedAt, __v, ...rest } = regObj;
          const deletedDoc = await DeletedRegistration.create({
            ...rest,
            originalId: String(_id),
            originalCreatedAt: createdAt,
            originalUpdatedAt: updatedAt,
            deletedBy: deletedBy || 'Admin',
            deletedAt: new Date(),
            reason: reason || ''
          });

          await Registration.findByIdAndDelete(_id);
          return deletedDoc.toObject ? deletedDoc.toObject() : deletedDoc;
        }
        return null;
      } catch (err) {
        console.error('MongoDB deleteRegistration error, falling back:', err.message);
      }
    }
    return localStore.deleteRegistration(id, deletedBy, reason);
  },

  async getDeletedRegistrations() {
    if (isMongoActive()) {
      try {
        const records = await DeletedRegistration.find().sort({ deletedAt: -1 }).lean();
        return records;
      } catch (err) {
        console.error('MongoDB getDeletedRegistrations error, falling back:', err.message);
      }
    }
    return localStore.getDeletedRegistrations();
  },

  async restoreRegistration(id) {
    if (isMongoActive()) {
      try {
        let deletedDoc = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          deletedDoc = await DeletedRegistration.findById(id);
        }
        if (!deletedDoc) {
          deletedDoc = await DeletedRegistration.findOne({ originalId: id });
        }
        if (deletedDoc) {
          const docObj = deletedDoc.toObject ? deletedDoc.toObject() : deletedDoc;
          const { _id, deletedBy, deletedAt, reason, originalId, originalCreatedAt, originalUpdatedAt, __v, ...rest } = docObj;

          const restored = await Registration.create({
            ...rest,
            createdAt: originalCreatedAt || new Date()
          });
          await DeletedRegistration.findByIdAndDelete(_id);
          return restored.toObject ? restored.toObject() : restored;
        }
        return null;
      } catch (err) {
        console.error('MongoDB restoreRegistration error, falling back:', err.message);
      }
    }
    return localStore.restoreRegistration(id);
  },

  async createAttendeePost(postData) {
    if (isMongoActive()) {
      try {
        const record = await AttendeePost.create(postData);
        return record.toObject();
      } catch (err) {
        console.error('MongoDB createAttendeePost error, falling back:', err.message);
      }
    }
    return localStore.addAttendeePost(postData);
  },

  async getAllAttendeePosts() {
    if (isMongoActive()) {
      try {
        const records = await AttendeePost.find().sort({ createdAt: -1 }).lean();
        return records;
      } catch (err) {
        console.error('MongoDB getAllAttendeePosts error, falling back:', err.message);
      }
    }
    return localStore.getAttendeePosts();
  }
};

import { Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  сode?: string;
}

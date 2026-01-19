export interface RichTextChild {
  text: string;
}

export interface RichTextBlock {
  children: RichTextChild[];
}

export type RichText = RichTextBlock[];

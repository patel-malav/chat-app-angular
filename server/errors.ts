export const InternalServerError = ({ url }: { url: string }) => {
  return {
    errors: [{ msg: 'database error', location: url }],
  };
};

export const rulesParameters = (keyAction: string, data: any) => {
  const PARAMENTS__DYNAMIC = {
    EDIT: {
      verb: 'PUT',
      data,
      nameButton: 'Actualizar',
    },
    VIEWS: {
      verb: 'VIEWS',
      data,
      nameButton: null,
    },
  };

  return PARAMENTS__DYNAMIC[keyAction];
};

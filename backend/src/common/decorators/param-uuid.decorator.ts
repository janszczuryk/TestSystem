import { Param, ParseUUIDPipe } from '@nestjs/common';

export const ParamUUID = (property: string) => Param(property, new ParseUUIDPipe({ version: '4' }));

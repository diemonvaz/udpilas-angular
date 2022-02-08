import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { RolController } from '../controller/RolController';
import { Authassignment } from '../entity/Authassignment';
import { Authitem } from '../entity/Authitem';
import { Authitemchild } from '../entity/Authitemchild';
import { exit } from 'process';

export const checkRole = (roles: Array<string>) => {

  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("Check Roles = ",roles);
    const userId = res.locals.userId;
    const authAssignmentRepository = getRepository(Authassignment);
    const authItemRepository = getRepository(Authitem);
    let userRoles: Authassignment[];
    let userRolesName: string[];

    //Función que chekea si el usuario tiene entre sus roles el rol pasado por parámetro o algunos de sus roles padres
    // const checkAuthItem = async (rol : string, userRolesName : string[]) => {
    //   let authItem : Authitem;

    //   if (typeof rol !== 'string') {
    //     throw TypeError('Expected first parameter to be string : role');
    //   }
    //   try {
    //     authItem = await authItemRepository.findOneOrFail({where:{name:rol}});
    //   } catch (e) {
    //     throw Error('Rol \''+rol+'\' not found in database');
    //   }

    //   if(userRolesName.includes(authItem.name)) 
    //     return true;
      
    //   let parents : Authitemchild[] = await authItem.parents;

    //   if(parents.length == 0)
    //     return false;

    //   return await asyncSome(await parents, async (parent) => {
    //     return checkAuthItem(parent.parent, userRolesName);
    //   });
    // };

    //Función que mira si el predicado se cumple en algún elemento de un array asincronamente
    // const asyncSome = async (arr, predicate) => {
    //   for (let e of arr) {
    //     if (await predicate(e)) return true;
    //   }
    //   return false;
    // };

    try {
      userRoles = await authAssignmentRepository.find({where:{userid:userId}});
      userRolesName = userRoles.map(authassignment => authassignment.itemname);
    } catch (e) {
      return res.status(401).json({ message: 'User has no roles' });
    }

    //Check permission
    let permission : boolean = false;

    permission = await RolController.asyncSome(roles, async (rol) => {
      return await RolController.checkAuthItem(rol, userRolesName);
    });
    if (permission) {
      next();
    } else {
      res.status(401).json({ message: 'Not Authorized' });
    }
  };
};

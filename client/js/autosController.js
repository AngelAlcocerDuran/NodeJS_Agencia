
const url = 'http://localhost:4000'

const findAll = async() => {
    await $.ajax({
        type: 'GET',
        url: url + '/autos'
    }).done(res => {
        let table = $('#table');
        let listAutos = res.listAutos;

        table.append(
            "<tr class='bg-dark text-white'>"+
              "<th scope='col'>Id</th>"+
              "<th scope='col'>Nombre</th>"+
              "<th scope='col'>Matrícula</th>"+
              "<th scope='col'>Marca</th>"+
              "<th scope='col'>Detalles</th>"+
              "<th scope='col'>Editar</th>"+
              "<th scope='col'>Eliminar</th>"+
            "</tr>"
        )

        for(let i = 0; i < listAutos.length; i++){ 

            table.append(
                "<tr class='text-dark'>"+
                  "<td>"+ listAutos[i].id +"</td>"+
                  "<td>"+ listAutos[i].nombre +"</ttd>"+
                  "<td>"+ listAutos[i].matricula +"</td>"+
                  "<td>"+ listAutos[i].marca +"</td>"+
                  "<td><button class='btn btn-primary' data-target='#details' data-toggle='modal' onclick='getDetails("+ listAutos[i].id +")'><i class='fas fa-info-circle'></i></button></td>"+
                  "<td><button class='btn btn-warning' data-target='#update' data-toggle='modal' onclick='getInfoUpdate("+ listAutos[i].id +")'><i class='fas fa-edit'></i></button></td>"+
                  "<td><button class='btn btn-danger' data-target='#remove' data-toggle='modal' onclick='idForRemove("+ listAutos[i].id +")'><i class='fas fa-trash'></i></button></td>"+
                "</tr>"
            )
        }
    });
}

findAll();

const getById = async(id) => {
    return await $.ajax({
        type: 'GET',
        url: url + '/autos/' + id
    }).done(res => res);
};

const getDetails = async(id) => {
    let auto = await getById(id);
    document.getElementById('d_registered'). innerHTML = auto.autos[0].registered;
    document.getElementById('d_updated').innerHTML = auto.autos[0].updated;
    document.getElementById('d_status').innerHTML = auto.autos[0].estado? "Disponible" : "No disponible";
};

const getInfoUpdate = async(id) => {
    let auto = await getById(id);
    document.getElementById('u_id'). value = id;
    document.getElementById('u_name').value = auto.autos[0].nombre;
    document.getElementById('u_mat'). value = auto.autos[0].matricula;
    document.getElementById('u_adv'). value = auto.autos[0].adv;
    document.getElementById('u_marca'). value = auto.autos[0].marca;
};

const create = async() => {
    let nombre = document.getElementById('c_name').value;
    let matricula = document.getElementById('c_mat'). value;
    let adv = document.getElementById('c_adv'). value;
    let marca = document.getElementById('c_marca'). value;

    await $.ajax({
        type:'POST',
        url: url + '/autos/create',
        data: { nombre, matricula, adv, marca }
    }).done(res => {
        console.log(res);
    });
};

const update = async() => {
    let id = document.getElementById('u_id'). value;
    let nombre = document.getElementById('u_name').value;
    let matricula = document.getElementById('u_mat'). value;
    let adv = document.getElementById('u_adv'). value;
    let marca = document.getElementById('u_marca'). value;

    await $.ajax({
        type: 'POST',
        url: url + '/autos/update/' +id,
        data: { nombre, matricula, adv, marca }
    }).done(res => {
        console.log(res);
    });
};

const idForRemove = async(id) => {
    document.getElementById('r_id').value = id;
}

const remove = async() => {
    let id = document.getElementById('r_id').value;

    await $.ajax({
        type: 'POST',
        url: url + '/autos/remove/' + id
    }).done(res => {
        console.log(res);
    });
};
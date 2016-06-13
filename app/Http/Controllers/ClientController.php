<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\ClientRepository;
use CodeProject\Services\ClientService;
use Illuminate\Http\Request;
use Prettus\Validator\Exceptions\ValidatorException;

class ClientController extends Controller
{
    /**
     * @var ClientRepository
     */
    private $repository;

    /**
     * @var ClientService
     */
    private $service;

    /**
     * @param ClientRepository $repository
     * @param ClientService $service
     */
    public function __construct(ClientRepository $repository, ClientService $service)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $limit = $request->query->get('limit', 15);
        return $this->service->all($limit);
    }

    public function clientsProject()
    {
        return $this->service->clientsProject();
    }

    public function store(Request $request)
    {
        try {
            return $this->service->create($request->all());
        } catch (ValidatorException $e) {
            Response::json([
                'error'     => true,
                'message'   => $e->getMessageBag()
            ], 400);
        }
    }

    public function show($id)
    {
        return $this->service->find($id);
    }

    public function update(Request $request, $id)
    {
        $this->service->update($request->all(), $id);
    }

    public function destroy($id)
    {
        $this->service->delete($id);
        return response("", 204);
    }
}
